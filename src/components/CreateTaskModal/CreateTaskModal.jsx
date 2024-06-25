import React from "react";
import Modal from "react-modal";
import deleteIcon from "../../assets/deleteIcon.svg";
import styles from "./CreateTaskModal.module.css";

export default function CreateTaskModal({ closeModal }) {
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
          {/* {errors.name && (
            <span className={styles.error}>{errors.name}</span>
          )} */}
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
        <div className={styles.assignmentWrapper}>
          <h3 className={styles.labelText}>Assign to</h3>
          <div className={styles.assignWrapper}>
            <span className={styles.smallText}>Add a assignee</span>
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
            <button className={`${styles.primaryButton}`}>Create</button>
            {/* <button className={`${styles.primaryButton}`}>save</button> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
