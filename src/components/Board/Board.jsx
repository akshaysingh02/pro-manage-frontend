import React from 'react'
import styles from "./board.module.css"
import collapseIcon from "../../assets/icon_collapse-all.svg"
import Card from '../Card/Card'
export default function Board() {
  return (
    <>
      <div className={styles.welcomeWrapper}>
        <p className={styles.welcomeMessage}>Welcome? <span>Akshay</span></p>
        <p className={styles.currentDate}>12th, jan 2024</p>
      </div>

      <div className={styles.filterWrapper}>
        <h3>Board</h3>
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
      </div>
    </>
  )
}
