
import { useEffect } from 'react';
import { createPortal } from "react-dom"
import styles from './Modal.module.css'

const modalRoot = document.getElementById("modal-root");



export default function Modal({ modalImg, tags, onClose}) {

  useEffect(() => {

    document.addEventListener("keydown", closeModal);

    return () => {document.removeEventListener("keydown", closeModal)}
  },[]);

  const closeModal = ({target, currentTarget, code}) => {
    if (target === currentTarget || code === "Escape") {
      onClose();
    }
  }

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>
      <img src={modalImg} alt={tags} />
      </div>
    </div>,
    modalRoot
  )
}

