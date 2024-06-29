import React from 'react'
import Modal from "react-modal";
import styles from "./confirmDeleteModal.module.css"

Modal.setAppElement("#root");


export default function ConfirmDeleteModal({closeDeleteModal, handleDelete,handleTaskRefresh}) {

  const handleTaskDelete = async() =>{
    await handleDelete();
    handleTaskRefresh();
    closeDeleteModal();
  }

  return (
    <Modal
      isOpen
      onRequestClose={closeDeleteModal}
      className={styles.addPeopleModal}
      overlayClassName={styles.overlay}
    >
    <div className={styles.logoutWrapper}>
        <h3 className={styles.logoutHeading}>Are you sure you want to delete</h3>
        <button className={`${styles.primaryButton} `} onClick={handleTaskDelete}>Yes, Delete</button>
        <button className={`${styles.primaryButton} ${styles.secondaryButton}`} onClick={closeDeleteModal}>Cancel</button>
    </div>
    </Modal>
  );
}

