import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css'

const ImageGallery = props => {
    const { images, onClick } = props;
  
    return (
      <ul className={styles.image_gallery}>
        {images.map(image => (
           <ImageGalleryItem 
            key={image.id}
            image={image} 
            onClick={onClick} 
            />
        ))}
      </ul>
    );
  };
  ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  };
  export default ImageGallery;