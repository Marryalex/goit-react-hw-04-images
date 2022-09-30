import React, { Component } from 'react'
import styles from './Searchbar.module.css'
import PropTypes from 'prop-types';
import {ImSearch} from "react-icons/im";

export default class Searchbar extends Component {
    state = {
        imageName: "",
      };

      static propTypes = {
        onSubmit: PropTypes.func.isRequired,
      };

      handleChange = (e) => {
      this.setState({imageName: e.currentTarget.value.toLowerCase()});
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.imageName);
        this.reset();
      };

      reset() {
        this.setState({
            imageName: "",
        });
      }
  render() {
    return (
      <div>
      <header className={styles.searchbar}>
  <form className={styles.form} onSubmit={this.handleSubmit}>
    <button type="submit" className={styles.button}>
    <ImSearch />
      <span className={styles.button_label}>Search</span>
    </button>

    <input
      className={styles.input}
      type="text"
      name='imageName'
      value={this.state.imageName}
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={this.handleChange}
    />
  </form>
</header>
      </div>
    )
  }
}
