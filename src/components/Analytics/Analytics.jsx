import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { getAnalytics } from "../../api/task";

export default function Analytics() {
  const [data, setData] = useState({});
  const [isLoading,setIsLoading] = useState(false)
  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      const result = await getAnalytics();
      setData(result.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className={styles.analyticsContainer}>
      <h1 className={styles.analyticsHeading}>Analytics</h1>
      {isLoading ? (
        <div className={styles.loadingOverlay}>Loading...</div>
      ):(
        <div className={styles.analyticsCardWrapper}>
        <ul className={styles.analyticsCard}>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Backlog Tasks</span>{" "}
              <span className={styles.dataValue}>
                {data?.userCreatedTaskStats?.totalBacklogTasks +
                  data?.assignedTaskStats?.totalBacklogTasks}
              </span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>To-do Tasks</span>{" "}
              <span className={styles.dataValue}>
                {data?.userCreatedTaskStats?.totalTodoTasks +
                  data?.assignedTaskStats?.totalTodoTasks}
              </span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>In-Progress Tasks</span>{" "}
              <span className={styles.dataValue}>{data?.userCreatedTaskStats?.totalInProgressTasks +
                data?.assignedTaskStats?.totalInProgressTasks}</span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Completed Tasks</span>{" "}
              <span className={styles.dataValue}>{data?.userCreatedTaskStats?.totalDoneTasks +
                data?.assignedTaskStats?.totalDoneTasks}</span>
            </div>
          </li>
        </ul>
        <ul className={styles.analyticsCard}>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Low Priority</span>{" "}
              <span className={styles.dataValue}>{data?.userCreatedTaskStats?.totalLowPriorityTasks +
                data?.assignedTaskStats?.totalLowPriorityTasks}</span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Moderate Priority</span>{" "}
              <span className={styles.dataValue}>{data?.userCreatedTaskStats?.totalModeratePriorityTasks +
                data?.assignedTaskStats?.totalModeratePriorityTasks}</span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>High Priority</span>{" "}
              <span className={styles.dataValue}>{data?.userCreatedTaskStats?.totalHighPriorityTasks +
                data?.assignedTaskStats?.totalHighPriorityTasks}</span>
            </div>
          </li>
          <li>
            <div className={styles.analyticsLi}>
              <span className={styles.dataName}>Due Date Tasks</span>{" "}
              <span className={styles.dataValue}>{data?.userCreatedTaskStats?.totalTasksWithDueDate +
                data?.assignedTaskStats?.totalTasksWithDueDate}</span>
            </div>
          </li>
        </ul>
      </div>
      )}
      
      
    </div>
  );
}
