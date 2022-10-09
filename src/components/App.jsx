import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar/Searchbar';
import { getPhoto } from './API/fetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from "./Loader/Loader";
import { Button } from './Button/Button';

export default function App() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [tags, setTags] = useState('');
  const [totalImg, setTotalImg] = useState(0);

useEffect(() => {
  if (!search) {
    return;
  }
  const fetchPhoto = async () => {
  setLoading(true);

    try {
      const data = await getPhoto(page, search);

        if (!data.hits.length) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }

        setTotalImg(data.totalHits) 

        setImages((prevImages) => {
         return [...prevImages, ...data.hits]
        })

    } catch (error) {
        setError(error)
    }
    finally {
        setLoading(false)
    }
    }
    fetchPhoto();
}, [page, search])

const handleFormSubmit = imageName => {
  if (imageName !== search) {
    setSearch(imageName)
    setPage(1)
    setImages([])
  }
}

const handleLoadMore = (p) => {
  setPage(p => p + 1 );
};

const openModal = (modalImg, tags) => {
  setIsModal(true);
  setModalImg(modalImg)
  setTags(tags)
}

const closeModal = () => {
  setIsModal(false);
  setModalImg(null)
  setTags('')
}

const isImages = Boolean(images.length);

  return (
    <div>
         {isModal && (
          <Modal
            modalImg={modalImg}
            onClose={closeModal}
            tags={tags}
          />
        )}
<Searchbar onSubmit={handleFormSubmit}/>
{error && <p>Sorry! Please try again...</p>}
{isImages && <ImageGallery images={images} onClick={openModal}/>}
{loading && <Loader/>}
{images.length > 0 && images.length < totalImg && (
          <Button handleLoadMore={handleLoadMore} />
        )}
      </div>
  )
}


