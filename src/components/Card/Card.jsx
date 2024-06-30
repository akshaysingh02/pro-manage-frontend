import React, { useState, useEffect, useRef } from "react";
import styles from "./card.module.css";
import dotsIcons from "../../assets/dots.svg";
import arrow from "../../assets/downArrow.svg";
import { truncateData } from "../../utils/truncate";
import {
  deleteTask,
  updateTaskDetails,
  updateTaskStatus,
} from "../../api/task";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import { getFormattedDate, getMonthDay, isPastDueDate } from "../../utils/Date";

export default function Card({
  task,
  handleTaskRefresh,
  handleTaskShare,
  isCollapsed,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkList, setCheckList] = useState(task.checkList || []);
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);
  const dropdownRef = useRef(null);
  const optionButtonRef = useRef(null);

  const statuses = ["backlog", "to do", "in progress", "done"];
  const availableStatuses = statuses.filter((status) => status !== task.status);
  const frontEndLink = "https://master--pro-manage-web.netlify.app";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
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

  const handleShare = () => {
    setIsDropdownOpen(false);
    const fullUrl = `${frontEndLink}/share/${task.uniqueLink}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      handleTaskShare();
    });
  };

  const handleDelete = async () => {
    setIsDropdownOpen(false);
    setIsLoading(true);
    try {
      const result = await deleteTask(task._id);
      if (result.status === 200) {
        console.log("task deleted");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    console.log("Delete clicked");
  };

  const taskUpdate = async (updatedTask) => {
    setIsLoading(true);
    try {
      if(updatedTask.assignedTo === JSON.parse(localStorage.getItem("userEmail"))){
        delete updatedTask.assignedTo
      }
      const response = await updateTaskDetails(task._id, updatedTask);
      if (response?.status === 200) {
        await handleTaskRefresh();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedCheckList = checkList.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setCheckList(updatedCheckList);

    const updatedTask = { ...task, checkList: updatedCheckList };
    taskUpdate(updatedTask);
  };

  const toggleTaskList = () => {
    setIsTaskListOpen(!isTaskListOpen);
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

  useEffect(() => {
    setIsTaskListOpen(false);
  }, [isCollapsed]);

  useEffect(() => {
    setCheckList(task.checkList || []);
  }, [task]);

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
            {!!task.assignedTo && (
              <div className={styles.assignedToWrapper} title={task.assignedTo}>
                {task?.assignedTo[0].toUpperCase()}
                {task?.assignedTo[1].toUpperCase()}
              </div>
            )}
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
                  onClick={openDeleteModal}
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
          <div className={styles.checklistHeader} onClick={toggleTaskList}>
            <p className={styles.checklistText}>
              Checklist{" "}
              <span>
                ({task?.checkList.filter((check) => check.done).length}/
                {task?.checkList.length})
              </span>
            </p>
            <div
              className={`${styles.dropDownButton} ${
                isTaskListOpen ? styles.rotated : ""
              }`}
            >
              <img src={arrow} alt="decorative" />
            </div>
          </div>

          {isTaskListOpen && (
            <div className={styles.taskListWrapper}>
              {checkList.map((data, index) => (
                <div key={data._id} className={styles.checklistTask}>
                  <input
                    type="checkbox"
                    name="checkbox"
                    checked={data.done}
                    className={styles.taskCheckbox}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span className={styles.taskTitle}>{data.item}</span>
                </div>
              ))}
            </div>
          )}
          <div className={styles.cardToastWrapper}>
            {task?.dueDate && (
              <div
                className={`${styles.toast} ${
                  isPastDueDate(task?.dueDate) ? styles.dueDateToast : ""
                } ${task?.status === "done" ? styles.greenBackground : ""} `}
              >
                {getMonthDay(task.dueDate)}
                {isPastDueDate(task?.dueDate)}
              </div>
            )}
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
          task={task}
          handleTaskRefresh={handleTaskRefresh}
          setIsLoading={setIsLoading}
        />
      )}
      {deleteModal && (
        <ConfirmDeleteModal
          closeDeleteModal={closeDeleteModal}
          handleDelete={handleDelete}
          handleTaskRefresh={handleTaskRefresh}
        />
      )}
    </>
  );
}
