import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { useNavigate } from "react-router-dom";
import mainLogo from "../../assets/mainLogo.svg";
import boardLogo from "../../assets/boardLogo.svg";
import analyticsLogo from "../../assets/analyticsLogo.svg";
import settingsLogo from "../../assets/settingsLogo.svg";
import logoutLogo from "../../assets/logoutLogo.svg";

export default function Sidebar({ onSidebarClick, selectedSection }) {
  const [activeButton, setActiveButton] = useState();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleClick = (section) => {
    onSidebarClick(section);
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoWrapper}>
        <img src={mainLogo} alt="decorative" />
        <span className={styles.logoText}>Pro Manage</span>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          className={`${styles.sidebarNavButton} ${selectedSection === "board" ? styles.activeButton : ""}`}
          onClick={() => handleClick("board")}
          
        >
          <img src={boardLogo} alt="" />{" "}
          <span className={styles.innerButton}>Board</span>
        </button>
        <button
          className={`${styles.sidebarNavButton} ${selectedSection === "analytics" ? styles.activeButton : ""}`}
          onClick={() => handleClick("analytics")}
        >
          <img src={analyticsLogo} alt="" />{" "}
          <span className={styles.innerButton}>Analytics</span>
        </button>
        <button
          className={`${styles.sidebarNavButton} ${selectedSection === "settings" ? styles.activeButton : ""}`}
          onClick={() => handleClick("settings")}
        >
          <img src={settingsLogo} alt="" />{" "}
          <span className={styles.innerButton}>Settings</span>
        </button>
      </div>
      <div className={styles.logoutWrapper}>
        <div className={styles.logoutButton} onClick={handleLogOut}>
          <img src={logoutLogo} alt="" /> <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
