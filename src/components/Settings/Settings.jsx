import React from "react";
import styles from "./settings.module.css";

export default function Settings() {
  return (
    <div className={styles.settingContainer}>
      <h2 className={styles.settingHeading}>Settings</h2>
      <div className={styles.updateForm}>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.inputText} ${styles.inputName}`}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className={styles.inputWrapper}>
        <input
          className={styles.inputText}
          type="email"
          name="email"
          placeholder="Update Email"
          required
        />
        </div>
        <div className={styles.inputWrapper}>
        <input
          className={`${styles.inputText} ${styles.inputPassword}`}
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          required
        />
        </div>
        <div className={styles.inputWrapper}>
        <input
          className={`${styles.inputText} ${styles.inputPassword}`}
          type="password"
          name="newPassword"
          placeholder="New Password"
          required
        />
        </div>
        <div className={styles.inputWrapper}>
        <button className={styles.primaryButton}>Update</button>
        </div>
      </div>
    </div>
  );
}
