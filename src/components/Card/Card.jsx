import React from "react";
import styles from "./card.module.css";
import dotsIcons from "../../assets/dots.svg";
import arrow from "../../assets/downArrow.svg";

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.priorityWrapper}>
          <div className={styles.priorityCircle}></div>
          <span className={styles.priorityText}>HIGH PRIORITY</span>
        </div>
        <div className={styles.optionButton}>
          <img src={dotsIcons} alt="decorative" />
        </div>
      </div>
      <div className={styles.titleWrapper}>
        Typography change in the First two screens of th...
      </div>
      <div className={styles.checklistWrapper}>
        <div className={styles.checklistHeader}>
          <p className={styles.checklistText}>
            Checklist <span>0/3</span>
          </p>
          <div className={styles.dropDownButton}>
            <img src={arrow} alt="decorative" />
          </div>
        </div>
        <div className={styles.taskListWrapper}>
          <div className={styles.checklistTask}>
            <input type="checkbox" name="" id="" />
            <span className={styles.taskTitle}>Task to be done</span>
          </div>
          <div className={styles.checklistTask}>
            <input type="checkbox" name="" id="" />
            <span className={styles.taskTitle}>Task to be done</span>
          </div>
          <div className={styles.checklistTask}>
            <input type="checkbox" name="" id="" />
            <span className={styles.taskTitle}>
              Task to be done ede lorem Ipsum is a Dummy text t
            </span>
          </div>
        </div>
        <div className={styles.cardToastWrapper}>
          <div className={styles.dueDateToast}>Feb 10th</div>
          <div className={styles.changerToastsWrapper}>
            <div className={styles.toast}>PROGRESS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
