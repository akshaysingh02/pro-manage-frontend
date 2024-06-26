import React,{useState,useEffect} from 'react'
import styles from "./board.module.css"
import collapseIcon from "../../assets/icon_collapse-all.svg"
import addPeopleIcon from "../../assets/add_people.svg"
import plusIcon from "../../assets/plusIcon.svg"
import Card from '../Card/Card'
import AddPeopleModal from '../AddPeopleModal/AddPeopleModal'
import { getFormattedDate } from '../../utils/Date'
import { getUserDetails } from '../../api/auth'
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotification from '../Toast/ToastNotification'



export default function Board() {
  const [message, setMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createTaskModal,setCreateTaskModal] = useState(false)
  const [userName, setUserName] = useState("")

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

  const notify = () =>{

  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUserDetails();
        setUserName(result.data.name)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <div className={styles.welcomeWrapper}>
        <p className={styles.welcomeMessage}>Welcome! <span>{userName}</span></p>
        <p className={styles.currentDate}>{getFormattedDate()}</p>
      </div>

      <div className={styles.filterWrapper}>
      <div className={styles.boardHeadingWrapper}>
      <h3>Board</h3>
      <div className={styles.addPeopleButton} onClick={openModal}> <img src={addPeopleIcon} alt="decorative" /> Add People</div>
      </div>
        
        <div className={styles.filterBox}>
          This week
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
            <Card />
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
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
            <Card />
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
        <div className={`${styles.taskColumn}`}>
          <div className={styles.columnHeader}>
            <h4>Backlog</h4>
            <div className={styles.colapseAllIcon}>
              <img src={collapseIcon} alt="decorative" />
            </div>
          </div>
          <div className={styles.cardWrapper}>
            <Card />
          </div>
        </div>
      </div>
      {isModalOpen && <AddPeopleModal closeModal={closeModal} />}
      {createTaskModal && <CreateTaskModal closeModal={closeTaskModal} setMessage={setMessage} />}
      <ToastNotification toastMessage={message} />
    </>
  )
}
