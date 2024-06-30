import React, { useEffect, useState } from "react";
import styles from "./TaskShare.module.css";
import { useParams } from "react-router-dom";
import { getSharedTask } from "../../api/task";
import logo from "../../assets/mainLogo.svg";
import { getMonthDay } from "../../utils/Date";

export default function TaskShare() {
  const { uniqueLink } = useParams();
  const [notFoundState, setNotFoundState] = useState(false);
  const [task, setTask] = useState({});

  const fetchTaskData = async () => {
    try {
      const result = await getSharedTask(uniqueLink);
      if (result === 404) {
        setNotFoundState(true);
      } else if (result.status === 200) {
        setTask(result.data.taskData);
      }
    } catch (error) {
      console.log(error);
      setNotFoundState(true);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [uniqueLink]); // Add uniqueLink as a dependency

  useEffect(() => {
    console.log(task); // Log updated task
  }, [task]);

  return (
    <>
      {notFoundState ? (
        <div className={styles.errorWrapper}>
          error 404! <br /> Task not found
        </div>
      ) : (
        <div className={styles.pageWrapper}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="" /> pro Manage
          </div>
          <div className={styles.taskWrapper}>
            <div className={styles.priorityWrapper}>
              <div
                className={`${styles.priorityCircle} ${
                  task.priority === "low" ? styles.greenCircle : ""
                } ${task.priority === "moderate" ? styles.blueCircle : ""} ${
                  task.priority === "high" ? styles.redCircle : ""
                } `}
              ></div>
              <span className={styles.priorityText}>
                {task?.priority?.toUpperCase()} PRIORITY
              </span>
            </div>
            <h3 className={styles.titleHeading}>{task?.title}</h3>
            <div className={styles.checkListWrapper}>
              <div className={styles.checklistHeading}>
                <h3 className={styles.labelText}>
                  Checklist{" "}
                  <span>
                    ({task?.checkList?.filter((check) => check.done)?.length}/
                    {task?.checkList?.length})
                  </span>
                </h3>
              </div>
              <div className={styles.listWrapper}>
                {task?.checkList?.map((check, index) => (
                  <div className={styles.checklistItem} key={index}>
                    <div className={styles.itemInputWrapper}>
                      <input
                        type="checkbox"
                        checked={check.done}
                      />
                      <input
                        className={styles.itemInput}
                        type="text"
                        placeholder="Type..."
                        value={check.item}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {!!task?.dueDate && (
                <div className={styles.dueDateWrapper}>Due Date <span className={styles.coloredDueDate}>{getMonthDay(task?.dueDate)}</span> </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
