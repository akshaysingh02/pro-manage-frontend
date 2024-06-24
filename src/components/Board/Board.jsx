import React,{useState} from 'react'
import styles from "./board.module.css"
import collapseIcon from "../../assets/icon_collapse-all.svg"
import addPeopleIcon from "../../assets/add_people.svg"
import Card from '../Card/Card'
import AddPeopleModal from '../AddPeopleModal/AddPeopleModal'
import { getFormattedDate } from '../../utils/Date'
export default function Board() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.welcomeWrapper}>
        <p className={styles.welcomeMessage}>Welcome! <span>Akshay</span></p>
        <p className={styles.currentDate}>{getFormattedDate()}</p>
      </div>

      <div className={styles.filterWrapper}>
      <div className={styles.boardHeadingWrapper}>
      <h3>Board</h3>
      <div className={styles.addPeopleButton} onClick={openModal}> <img src={addPeopleIcon} alt="decorative" /> Add People</div>
      </div>
        
        <div className={styles.filterBox}>
          This week
        </div>
      </div>

      <div className={styles.columnWrapper}>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
      </div>
      {isModalOpen && <AddPeopleModal closeModal={closeModal} />}
    </>
  )
}
