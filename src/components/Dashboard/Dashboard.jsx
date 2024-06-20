import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Board from "../Board/Board";
import Analytics from "../Analytics/Analytics";
import Settings from "../Settings/Settings";
export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("board");

  const handleSidebarClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className={styles.container}>
      <Sidebar onSidebarClick={handleSidebarClick} selectedSection={selectedSection}/>
      <div className={styles.contentHolder}>
        {selectedSection === "board" &&
         <Board />}
        {selectedSection === "analytics" && <Analytics />}
        {selectedSection === "settings" && <Settings />}
      </div>
    </div>
  );
}
