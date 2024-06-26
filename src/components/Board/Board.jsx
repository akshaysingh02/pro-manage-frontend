import React, { useState, useEffect } from "react";
import styles from "./board.module.css";
import collapseIcon from "../../assets/icon_collapse-all.svg";
import addPeopleIcon from "../../assets/add_people.svg";
import plusIcon from "../../assets/plusIcon.svg";
import Card from "../Card/Card";
import AddPeopleModal from "../AddPeopleModal/AddPeopleModal";
import { getFormattedDate } from "../../utils/Date";
import { getUserDetails } from "../../api/auth";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastNotification from "../Toast/ToastNotification";
import { getTasks } from "../../api/task";

export default function Board() {
  const [filter, setFilter] = useState("this_week");
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [userName, setUserName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openTaskModal = () => {
    setCreateTaskModal(true);
  };

  const closeTaskModal = () => {
    setCreateTaskModal(false);
  };

  const fetchTasks = async () => {
    try {
      const taskResult = await getTasks(filter);
      setTasks(taskResult.data);
      // console.log(taskResult.data);
    } catch (error) {
      console.error("Error fetching Tasks:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUserDetails();
        setUserName(result.data.name);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchTasks(filter);
  }, [filter]);

  return (
    <>
      <div className={styles.welcomeWrapper}>
        <p className={styles.welcomeMessage}>
          Welcome! <span>{userName}</span>
        </p>
        <p className={styles.currentDate}>{getFormattedDate()}</p>
      </div>

      <div className={styles.filterWrapper}>
        <div className={styles.boardHeadingWrapper}>
          <h3>Board</h3>
          <div className={styles.addPeopleButton} onClick={openModal}>
            {" "}
            <img src={addPeopleIcon} alt="decorative" /> Add People
          </div>
        </div>

        <div className={styles.filterBox}>
          <select
            className={styles.selectButton}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
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
            {tasks.assignedTasks
              ?.filter((task) => task.status === "backlog")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
            {tasks.usersTasks
              ?.filter((task) => task.status === "backlog")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>To do</h4>
            <div className={styles.createTaskButtonWrapper}>
              <div className={styles.plusIcon} onClick={openTaskModal}>
                <img src={plusIcon} alt="decorative" />
              </div>
              <div className={styles.colapseAllIcon}>
                <img src={collapseIcon} alt="decorative" />
              </div>
            </div>
          </div>
          <div className={styles.cardWrapper}>
            {tasks.assignedTasks
              ?.filter((task) => task.status === "to do")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
            {tasks.usersTasks
              ?.filter((task) => task.status === "to do")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>In Progress</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            {tasks.assignedTasks
              ?.filter((task) => task.status === "in progress")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
            {tasks.usersTasks
              ?.filter((task) => task.status === "in progress")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Done</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            {tasks.assignedTasks
              ?.filter((task) => task.status === "done")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
            {tasks.usersTasks
              ?.filter((task) => task.status === "done")
              .map((task) => (
                <Card key={task._id} task={task} />
              ))}
          </div>
        </div>
      </div>
      {isModalOpen && <AddPeopleModal closeModal={closeModal} />}
      {createTaskModal && (
        <CreateTaskModal closeModal={closeTaskModal} setMessage={setMessage} />
      )}
      <ToastNotification toastMessage={message} />
    </>
  );
}
