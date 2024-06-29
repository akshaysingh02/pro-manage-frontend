import React,{useState} from "react";
import Modal from "react-modal";
import styles from "./LogoutModal.module.css";


Modal.setAppElement("#root");


export default function LogoutModal({closeModal, handleLogOut}) {
  return (
    <Modal
      isOpen
      onRequestClose={closeModal}
      className={styles.addPeopleModal}
      overlayClassName={styles.overlay}
    >
    <div className={styles.logoutWrapper}>
        <h3 className={styles.logoutHeading}>Are you sure you want Logout</h3>
        <button className={`${styles.primaryButton} `} onClick={handleLogOut}>Yes, Logout</button>
        <button className={`${styles.primaryButton} ${styles.secondaryButton}`} onClick={closeModal}>Cancel</button>
    </div>
    </Modal>
  );
}
