import React from "react";
import styles from "./Analytics.module.css";

export default function Analytics() {
  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.analyticsHeading}>Analytics</h1>
      <div className={styles.analyticsCardWrapper}>
        <ul className={styles.analyticsCard}>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Backlog Tasks</span>{" "}
              <span className={styles.dataValue}>16</span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Backlog Tasks</span>{" "}
              <span className={styles.dataValue}>16</span>
            </div>
          </li>
        </ul>
        <ul className={styles.analyticsCard}>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Backlog Tasks</span>{" "}
              <span className={styles.dataValue}>16</span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Backlog Tasks</span>{" "}
              <span className={styles.dataValue}>16</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
