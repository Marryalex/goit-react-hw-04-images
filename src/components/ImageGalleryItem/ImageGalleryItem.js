import React from 'react';
import PropTypes from 'prop-types'
import styles from './ImageGalleryItem.module.css'


const ImageGalleryItem = ({ image, onClick}) => {
    const { webformatURL, tags, largeImageURL } = image;
 
    return (
      <li className={styles.image_gallery_item}
      onClick={() => onClick(largeImageURL, tags)}>
        <img src={webformatURL} alt={tags} className={styles.image_gallery_picture}/>
      </li>
    );
  };

export default ImageGalleryItem
  
  ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired,
  };