import React, { useState } from 'react'
import styles from './Searchbar.module.css'
// import PropTypes from 'prop-types';
import {ImSearch} from "react-icons/im";




export default function Searchbar({onSubmit}) {

  const [imageName, setImageName] = useState('')

  const handleChange = (e) => {
    setImageName(e.currentTarget.value.toLowerCase());
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(imageName);
      reset();
    };

    const reset =() => {
      setImageName('');
    }
  return (
    <div>
      <header className={styles.searchbar}>
  <form className={styles.form} onSubmit={handleSubmit}>
    <button type="submit" className={styles.button}>
    <ImSearch />
      <span className={styles.button_label}>Search</span>
    </button>

    <input
      className={styles.input}
      type="text"
      name='imageName'
      value={imageName}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleChange}
    />
  </form>
</header>
      </div>
  )
}

