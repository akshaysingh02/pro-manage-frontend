import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import deleteIcon from "../../assets/deleteIcon.svg";
import arrowDownIcon from "../../assets/downArrow.svg"
import styles from "./CreateTaskModal.module.css";
import { getCollabDetails } from "../../api/auth";

export default function CreateTaskModal({ closeModal }) {
  const [collaborators, setCollaborators] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const assignWrapperRef = useRef(null);
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    dueDate: "",
    checkList: [{ item: "", done: false }],
    assignedTo: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    priority: "",
    checkList: "",
    checkListTask: "",
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

  const handleCreate = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
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

  const handleAssign = (email,event) => {
    event.stopPropagation();
    setTaskData({ ...taskData, assignedTo: email });
    setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

//   useEffect(() => {
//     console.log(taskData)
//     console.log(showDropdown)
//   }, [taskData]);

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
            className={`${styles.inputText} ${styles.inputName}`}
            type="text"
            // value={}
            // onChange={}
            placeholder="Enter Task Title"
            name="name"
            required
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>
        <div className={styles.priorityWrapper}>
          <h3 className={styles.labelText}>
            Select Priority <span className={styles.redAstrick}>*</span>
          </h3>
          <div className={styles.priorityButtonWrapper}>
            <div className={`${styles.priorityButton}`}>
              <div
                className={`${styles.coloredCircle} ${styles.redCircle}`}
              ></div>
              HIGH PRIORITY
            </div>
            <div
              className={`${styles.priorityButton} ${styles.selectedButton}`}
            >
              <div
                className={`${styles.coloredCircle} ${styles.blueCircle}`}
              ></div>
              MODERATE PRIORITY
            </div>
            <div className={`${styles.priorityButton}`}>
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
            <span className={taskData.assignedTo ? styles.assignedText : styles.smallText}>{ taskData.assignedTo ||"Add an assignee"}</span>
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
                        <div className={styles.initialsWrapper}>{collaborator.email[0].toUpperCase()}{collaborator.email[1].toUpperCase()}</div>
                      {collaborator.email}
                      <button
                      className={styles.assignButton}
                      onClick={(event) => handleAssign(collaborator.email,event)}
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
              Checklist <span>(1/3)</span>{" "}
              <span className={styles.redAstrick}>*</span>
            </h3>
          </div>
          <div className={styles.listWrapper}>
            <div className={styles.checklistItem}>
              <div className={styles.itemInputWrapper}>
                <input type="checkbox" />
                <input
                  className={styles.itemInput}
                  type="text"
                  placeholder="Type..."
                />
              </div>
              <div className={styles.itemDeleteButton}>
                <img src={deleteIcon} alt="decorative" />
              </div>
            </div>
            <div className={styles.checklistItem}>
              <div className={styles.itemInputWrapper}>
                <input type="checkbox" />
                <input
                  className={styles.itemInput}
                  type="text"
                  placeholder="Type..."
                />
              </div>
              <div className={styles.itemDeleteButton}>
                <img src={deleteIcon} alt="decorative" />
              </div>
            </div>
            <div className={styles.checklistItem}>
              <div className={styles.itemInputWrapper}>
                <input type="checkbox" />
                <input
                  className={styles.itemInput}
                  type="text"
                  placeholder="Type..."
                />
              </div>
              <div className={styles.itemDeleteButton}>
                <img src={deleteIcon} alt="decorative" />
              </div>
            </div>
            <div className={styles.checklistItem}>
              <div className={styles.itemInputWrapper}>
                <input type="checkbox" />
                <input
                  className={styles.itemInput}
                  type="text"
                  placeholder="Type..."
                />
              </div>
              <div className={styles.itemDeleteButton}>
                <img src={deleteIcon} alt="decorative" />
              </div>
            </div>
          </div>
          {errors.checkList && (
            <span className={styles.error}>{errors.checkList}</span>
          )}
          <div className={styles.addItemButton}>
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
          <div className={styles.dueDateWrapper}>
            <span>Select Due Date</span>
          </div>
          <div className={styles.actionButtonsWrapper}>
            <button
              className={`${styles.primaryButton} ${styles.secondaryButton}`}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className={`${styles.primaryButton}`}
              onClick={handleCreate}
            >
              Create
            </button>
            {/* <button className={`${styles.primaryButton}`} onClick={handleUpdate}>Update</button> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
