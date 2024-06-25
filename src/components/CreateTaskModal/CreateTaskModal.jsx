import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import deleteIcon from "../../assets/deleteIcon.svg";
import arrowDownIcon from "../../assets/downArrow.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CreateTaskModal.module.css";
import { getCollabDetails } from "../../api/auth";

export default function CreateTaskModal({ closeModal }) {
  const [collaborators, setCollaborators] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const assignWrapperRef = useRef(null);
  const [dueDate, setDueDate] = useState(null);
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    checkList: [{ item: "", done: false }],
    assignedTo: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    priority: "",
    checkList: "",
  });

  const fetchCollaborators = async () => {
    try {
      const result = await getCollabDetails();
      if (result.status === 200) {
        setCollaborators(result.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCollaborators(null);
      } else {
        alert("Error fetching collaborators details:", error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!taskData.title) {
      errors.title = "Title is required";
      isValid = false;
    } else if (taskData.title.split(" ").length > 25) {
      errors.title = "Title should not contain more than 25 words";
      isValid = false;
    }

    if (!taskData.priority) {
      errors.priority = "Please select task priority";
      isValid = false;
    }

    if (taskData.checkList.some((check) => !check.item.trim())) {
      errors.checkList = "Check list input can't be empty";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleCreate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      // handle creation logic here
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      // handle update logic here
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignClick = () => {
    fetchCollaborators();
    setShowDropdown(true);
  };

  const handleOutsideClick = (event) => {
    if (
      assignWrapperRef.current &&
      !assignWrapperRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  const handleAssign = (email, event) => {
    event.stopPropagation();
    setTaskData({ ...taskData, assignedTo: email });
    setShowDropdown(false);
  };

  const handlePrioritySelection = (priority) => {
    setTaskData({ ...taskData, priority });
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...taskData.checkList];
    newChecklist[index].item = value;
    setTaskData({ ...taskData, checkList: newChecklist });
  };

  const handleChecklistDoneChange = (index) => {
    const newChecklist = [...taskData.checkList];
    newChecklist[index].done = !newChecklist[index].done;
    setTaskData({ ...taskData, checkList: newChecklist });
  };

  const addChecklistItem = () => {
    setTaskData({
      ...taskData,
      checkList: [...taskData.checkList, { item: "", done: false }],
    });
  };

  const deleteChecklistItem = (index) => {
    if (taskData.checkList.length > 1) {
      const newChecklist = taskData.checkList.filter((_, i) => i !== index);
      setTaskData({ ...taskData, checkList: newChecklist });
    }
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
    setTaskData({ ...taskData, dueDate: date });
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    console.log(taskData);
  }, [taskData]);

  return (
    <Modal
      isOpen
      onRequestClose={closeModal}
      className={styles.addPeopleModal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.createTaskWrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.labelText}>
            Title <span className={styles.redAstrick}>*</span>
          </h3>
          <input
            className={`${styles.inputText}`}
            type="text"
            value={taskData.title}
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
            placeholder="Enter Task Title"
            name="title"
            required
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div className={styles.priorityWrapper}>
          <h3 className={styles.labelText}>
            Select Priority <span className={styles.redAstrick}>*</span>
          </h3>
          <div className={styles.priorityButtonWrapper}>
            <div
              className={`${styles.priorityButton} ${
                taskData.priority === "high" ? styles.selectedButton : ""
              }`}
              onClick={() => handlePrioritySelection("high")}
            >
              <div
                className={`${styles.coloredCircle} ${styles.redCircle}`}
              ></div>
              HIGH PRIORITY
            </div>
            <div
              className={`${styles.priorityButton} ${
                taskData.priority === "moderate" ? styles.selectedButton : ""
              }`}
              onClick={() => handlePrioritySelection("moderate")}
            >
              <div
                className={`${styles.coloredCircle} ${styles.blueCircle}`}
              ></div>
              MODERATE PRIORITY
            </div>
            <div
              className={`${styles.priorityButton} ${
                taskData.priority === "low" ? styles.selectedButton : ""
              }`}
              onClick={() => handlePrioritySelection("low")}
            >
              <div
                className={`${styles.coloredCircle} ${styles.greenCircle}`}
              ></div>
              LOW PRIORITY
            </div>
          </div>
        </div>
        {errors.priority && (
          <span style={{ marginTop: "-15px" }} className={styles.error}>
            {errors.priority}
          </span>
        )}
        <div className={styles.assignmentWrapper}>
          <h3 className={styles.labelText}>Assign to</h3>
          <div
            className={styles.assignWrapper}
            onClick={handleAssignClick}
            ref={assignWrapperRef}
          >
            <span
              className={
                taskData.assignedTo ? styles.assignedText : styles.smallText
              }
            >
              {taskData.assignedTo || "Add an assignee"}
            </span>
            <div className={styles.downArrowWrapper}>
              <img src={arrowDownIcon} alt="down arrow" />
            </div>
            {showDropdown && (
              <div className={styles.dropdown}>
                {collaborators === null ? (
                  <div className={styles.noCollaborators}>
                    There are no collaborators
                  </div>
                ) : (
                  collaborators.map((collaborator, index) => (
                    <div key={index} className={styles.collaboratorItem}>
                      <div className={styles.initialsWrapper}>
                        {collaborator.email[0].toUpperCase()}
                        {collaborator.email[1].toUpperCase()}
                      </div>
                      {collaborator.email}
                      <button
                        className={styles.assignButton}
                        onClick={(event) =>
                          handleAssign(collaborator.email, event)
                        }
                      >
                        Assign
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.checkListWrapper}>
          <div className={styles.checklistHeading}>
            <h3 className={styles.labelText}>
              Checklist{" "}
              <span>
                (
                {
                  taskData.checkList.filter((check) => check.done).length
                }/{taskData.checkList.length})
              </span>{" "}
              <span className={styles.redAstrick}>*</span>
            </h3>
          </div>
          <div className={styles.listWrapper}>
            {taskData.checkList.map((check, index) => (
              <div className={styles.checklistItem} key={index}>
                <div className={styles.itemInputWrapper}>
                  <input
                    type="checkbox"
                    checked={check.done}
                    onChange={() => handleChecklistDoneChange(index)}
                  />
                  <input
                    className={styles.itemInput}
                    type="text"
                    placeholder="Type..."
                    value={check.item}
                    onChange={(e) =>
                      handleChecklistChange(index, e.target.value)
                    }
                  />
                </div>
                <div className={styles.itemDeleteButton}>
                  <img
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => deleteChecklistItem(index)}
                  />
                </div>
              </div>
            ))}
          </div>
          {errors.checkList && (
            <span className={styles.error}>{errors.checkList}</span>
          )}
          <div className={styles.addItemButton} onClick={addChecklistItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <rect
                x="5.00085"
                y="0.5"
                width="2"
                height="12"
                rx="1"
                fill="#767575"
              />
              <rect
                y="7.5"
                width="2"
                height="12"
                rx="1"
                transform="rotate(-90 0 7.5)"
                fill="#767575"
              />
            </svg>
            Add New
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <div
            className={styles.dueDateWrapper}
            onClick={() => document.querySelector("#dueDatePicker").click()}
          >
            {dueDate ? dueDate.toLocaleDateString("en-GB") : "Select Due Date"}
          </div>
          <DatePicker
            id="dueDatePicker"
            selected={dueDate}
            onChange={handleDueDateChange}
            dateFormat="dd/MM/yy"
            customInput={<div style={{ display: "none" }} />}
          />
          <div className={styles.actionButtonsWrapper}>
            <button
              className={`${styles.primaryButton} ${styles.secondaryButton}`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className={`${styles.primaryButton}`} onClick={handleCreate}>
              Create
            </button>
            {/* <button className={`${styles.primaryButton}`} onClick={handleUpdate}>Update</button> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
