import React, { useState, useEffect } from "react";
import styles from "./settings.module.css";
import { getUserDetails, updateUser } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import eyeIcon from "../../assets/eye_icon.svg";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await getUserDetails();
        setFormData((prevData) => ({
          ...prevData,
          name: result.data.name,
          email: result.data.email,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.oldPassword &&
      !formData.newPassword &&
      !formData.name &&
      !formData.email
    ) {
      newErrors.oldPassword = "All fields can't be empty";
      newErrors.newPassword = "All fields can't be empty";
      newErrors.name = "All fields can't be empty";
      newErrors.email = "All fields can't be empty";
    }

    if (formData.oldPassword && !formData.newPassword) {
      newErrors.oldPassword = "Both fields are required";
      newErrors.newPassword = "Both fields are required";
    }
    if (!formData.oldPassword && formData.newPassword) {
      newErrors.oldPassword = "Both fields are required";
      newErrors.newPassword = "Both fields are required";
    } else if (
      formData.oldPassword === formData.newPassword &&
      formData.oldPassword !== ""
    ) {
      newErrors.oldPassword = "Old and New passwords can't be same";
      newErrors.newPassword = "Old and New passwords can't be same";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    setErrors({ email: "", oldPassword: "", name: "", newPassword: "" });
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const result = await updateUser(formData);
    if (result === 401) {
      setErrors({ oldPassword: "Old password is not correct" });
    } else if (result.status === 200) {
      console.log("User details updated");
      await toast.success("User Details Updated", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const updatedFields = result.data.updatedFields;
      if (updatedFields.email || updatedFields.newPassword) {
        setTimeout(() => {
          handleLogOut();
        }, 3000);
      }
    } else {
      alert("updation failed. Please try again.");
    }
  };

  return (
    <div className={styles.settingContainer}>
      <h2 className={styles.settingHeading}>Settings</h2>
      <div className={styles.updateForm}>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.inputText} ${styles.inputName}`}
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            name="name"
            required
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={styles.inputText}
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Update Email"
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.inputWrapper}>
        <div className={styles.inputWrapperFix}>
          <input
            className={`${styles.inputText} ${styles.inputPassword}`}
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            onChange={handleChange}
            value={formData.oldPassword}
            placeholder="Old Password"
            required
          />
          <div
            className={styles.eyeWrapper}
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            <img
              className={styles.eye}
              src={eyeIcon}
              alt="passwordVisibility"
            />
          </div>
          </div>
          {errors.oldPassword && (
            <span className={styles.error}>{errors.oldPassword}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
        <div className={styles.inputWrapperFix}>
          <input
            className={`${styles.inputText} ${styles.inputPassword}`}
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            onChange={handleChange}
            value={formData.newPassword}
            placeholder="New Password"
            required
          />
          <div
            className={styles.eyeWrapper}
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            <img
              className={styles.eye}
              src={eyeIcon}
              alt="passwordVisibility"
            />
          </div>
          </div>
          {errors.newPassword && (
            <span className={styles.error}>{errors.newPassword}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <button className={styles.primaryButton} onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
