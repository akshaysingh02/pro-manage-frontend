import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./AddPeopleModal.module.css";
import { addPeople } from "../../api/auth";

Modal.setAppElement("#root");

export default function AddPeopleModal({ closeModal }) {
  const [recievedEmail, setRecievedEmail] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const currentUserEmail = JSON.parse(localStorage.getItem("userEmail"));
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (formData.email === currentUserEmail) {
      newErrors.email = "Can't add yourself as collaborator";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const result = await addPeople(formData);
    if (result === 409) {
      setErrors({ ...errors, email: "This email is already in use" });
    } else if (result.status === 201) {
      setStep(2);
      setRecievedEmail(result.data.email);
    } else {
      alert("Please try again.");
    }
  };

  //   useEffect(()=>{
  //     console.log(formData);
  //   },[formData])
  return (
    <>
      <Modal
        isOpen
        onRequestClose={closeModal}
        className={styles.addPeopleModal}
        overlayClassName={styles.overlay}
      >
        {step === 1 && (
          <div className={styles.peopleFormWrapper}>
            <div className={styles.inputHeadingWrapper}>
              <h3 className={styles.peopleFormHeading}>
                Add People to the board
              </h3>
              <input
                className={styles.inputText}
                type="email"
                placeholder="Enter the email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div className={styles.peopleButtonWrapper}>
              <button
                className={`${styles.primaryButton} ${styles.secondaryButton}`}
                onClick={closeModal}
              >
                cancel
              </button>
              <button className={styles.primaryButton} onClick={handleSubmit}>
                Add Email
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={styles.successWrapper}>
            <h3 className={styles.peopleFormHeading}>
              {recievedEmail}&nbsp;added to board
            </h3>
            <button
              style={{ maxWidth: "300px" }}
              className={styles.primaryButton}
              onClick={closeModal}
            >
              Okay, got it!
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
