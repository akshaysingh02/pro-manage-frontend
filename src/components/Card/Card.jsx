import React, { useState, useEffect, useRef } from "react";
import styles from "./card.module.css";
import dotsIcons from "../../assets/dots.svg";
import arrow from "../../assets/downArrow.svg";
import { truncateData } from "../../utils/truncate";
import { updateTaskStatus } from "../../api/task";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import ToastNotification from "../Toast/ToastNotification";

export default function Card({ task, handleTaskRefresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const dropdownRef = useRef(null);
  const optionButtonRef = useRef(null);

  const statuses = ["backlog", "to do", "in progress", "done"];
  const availableStatuses = statuses.filter((status) => status !== task.status);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleStatusChange = async (newStatus) => {
    setIsLoading(true);
    try {
      await updateTaskStatus(task?._id, newStatus);
      setIsLoading(false);
      handleTaskRefresh();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      optionButtonRef.current &&
      !optionButtonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // const handleEdit = () => {
  //   setIsDropdownOpen(false);
  //   // Add your edit logic here
  //   try {
  //     console.log(task);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log("Edit clicked");
  // };

  const handleShare = () => {
    setIsDropdownOpen(false);
    // Add your share logic here
    console.log("Share clicked");
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    // Add your delete logic here
    console.log("Delete clicked");
  };

  return (
    <>
      <div className={styles.card}>
        {isLoading && <div className={styles.loadingOverlay}>Loading...</div>}
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
          <div
            className={styles.optionButton}
            onClick={toggleDropdown}
            ref={optionButtonRef}
          >
            <img src={dotsIcons} alt="decorative" />
            {isDropdownOpen && (
              <div className={styles.dropdownMenu} ref={dropdownRef}>
                <div className={styles.dropdownItem} onClick={openModal}>
                  Edit
                </div>
                <div className={styles.dropdownItem} onClick={handleShare}>
                  Share
                </div>
                <div
                  style={{ color: "#CF3636" }}
                  className={styles.dropdownItem}
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.titleWrapper}>
          <span title={task.title}>{truncateData(task.title)}</span>
        </div>
        <div className={styles.checklistWrapper}>
          <div className={styles.checklistHeader}>
            <p className={styles.checklistText}>
              Checklist <span>0/{task?.checkList.length}</span>
            </p>
            <div className={styles.dropDownButton}>
              <img src={arrow} alt="decorative" />
            </div>
          </div>

          <div className={styles.taskListWrapper}>
            {task?.checkList.map((data) => (
              <div key={data._id} className={styles.checklistTask}>
                <input type="checkbox" name="" id="" />
                <span className={styles.taskTitle}>{data.item}</span>
              </div>
            ))}
          </div>
          <div className={styles.cardToastWrapper}>
            <div className={`${styles.toast} ${styles.dueDateToast}`}>
              Feb 10th
            </div>
            <div className={styles.changerToastsWrapper}>
              {availableStatuses?.map((s) => (
                <div
                  key={s}
                  className={styles.toast}
                  onClick={() => handleStatusChange(s)}
                >
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CreateTaskModal
          closeModal={closeModal}
          setMessage={setMessage}
          task={task}
          handleTaskRefresh={handleTaskRefresh}
        />
      )}
      <ToastNotification toastMessage={message} handleTaskRefresh={handleTaskRefresh} />
    </>
  );
}
