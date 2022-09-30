
import { Component } from 'react';
import { createPortal } from "react-dom"
import styles from './Modal.module.css'

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.closeModal)
  }

  closeModal = ({target, currentTarget, code}) => {
    if (target === currentTarget || code === "Escape") {
      this.props.onClose();
    }
  }

  render() {
    const { closeModal } = this;   
    const { modalImg, tags } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
        <img src={modalImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    )
  }
}