import React, { Component } from 'react'
import Searchbar from './Searchbar/Searchbar';
import { getPhoto } from './API/fetchImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from "./Loader/Loader";
import { Button } from './Button/Button';

export default class App extends Component {

  state = {
    images: [],
    loading: false,
    error: null,
    search: "",
    page: 1,
    isModal: false,
    modalImg: null,
    tags: '',
    totalImg: 0,
    }

componentDidUpdate(_, prevState) {
    const {page, search} = this.state;
    if((search && prevState.search !== search) || page > prevState.page) {
        this.fetchPhoto(search,page);
    }
}

    async fetchPhoto() {
        const {page, search} = this.state;
        this.setState({
            loading: true,
        });
    
        try {
            const data = await getPhoto(page, search);
            if (!data.hits.length) {
              alert(
                'Sorry, there are no images matching your search query. Please try again.'
              );
            }
            else {
            this.setState(({images}) => ({
                images: [...images, ...data.hits],
                totalImg: data.totalHits,  
            }))
          }
        } catch (error) {
            this.setState({
                error,
            })
        }
        finally {
            this.setState({ loading: false })
        }
        }
        

        handleFormSubmit = imageName => {
          if (imageName !== this.state.search) {
            this.setState({ search: imageName, page: 1, images: [],  });
          }
        };

        handleLoadMore = () => {
          this.setState(prevState => ({ page: prevState.page + 1 }));
        };

        openModal = (modalImg, tags) => {
          this.setState({
            isModal: true,
            modalImg,
            tags,
          })
      }
  
      closeModal = () => {
          this.setState({
            isModal: false,
            modalContent: {
              modalImg: null,
              tags: '',
              }
          })
      }

  render() {
    const {images, error, isModal, modalImg, tags, loading, totalImg } = this.state;
    const isImages = Boolean(images.length);

    return (
      <div>
         {isModal && (
          <Modal
            modalImg={modalImg}
            onClose={this.closeModal}
            tags={tags}
          />
        )}
<Searchbar onSubmit={this.handleFormSubmit}/>
{error && <p>Sorry! Please try again...</p>}
{isImages && <ImageGallery images={images} onClick={this.openModal}/>}
{loading && <Loader/>}
{images.length > 0 && images.length < totalImg && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    )
  }
}