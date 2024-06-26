import React from "react";
import styles from "./card.module.css";
import dotsIcons from "../../assets/dots.svg";
import arrow from "../../assets/downArrow.svg";
import { truncateData } from "../../utils/truncate";


export default function Card({ task }) {
  // console.log(task)
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.priorityWrapper}>
          <div
            className={`${styles.priorityCircle} ${
              task.priority === "low" ? styles.greenCircle : ""
            } ${task.priority === "moderate" ? styles.blueCircle : ""} ${
              task.priority === "high" ? styles.redCircle : ""
            } `}
          ></div>
          <span className={styles.priorityText}>
            {task.priority.toUpperCase()} PRIORITY
          </span>
        </div>
        <div className={styles.optionButton}>
          <img src={dotsIcons} alt="decorative" />
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <span title={task.title}>{truncateData(task.title)}</span>
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
          <div className={`${styles.toast} ${styles.dueDateToast}`}>
            Feb 10th
          </div>
          <div className={styles.changerToastsWrapper}>
            <div className={styles.toast}>PROGRESS</div>
            <div className={styles.toast}>TO DO</div>
            <div className={styles.toast}>DONE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
