import React, { useEffect, useState } from "react";
import styles from "./authStyles.module.css";
import { registerUser } from "../../api/auth";

export default function Signup({setIsLogin}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const result = await registerUser(formData);
    if (result === 409) {
      setErrors({ ...errors, email: "This email is already in use" });
    } else if (result === 200) {
      console.log("Account created");
      setIsLogin(true)
      // toast.success("Your account has been created", {
      //   position: "top-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      // setTimeout(() => {
      //   setIsLogin(true);
      // }, 3000);
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <div className={styles.loginWrapper}>
      <h2 className={styles.authHeading}>Register</h2>
      <div className={styles.loginInputWrapper}>
        <input
          className={styles.inputText}
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          value={formData.name}
          required
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
        <input
          className={styles.inputText}
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
        <input
          className={`${styles.inputText} ${styles.inputPassword}`}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        {errors.password && (
          <span className={styles.error}>{errors.password}</span>
        )}
        <input
          className={`${styles.inputText} ${styles.inputPassword}`}
          type="text"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
          required
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword}</span>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.primaryButton}
          onClick={handleSubmit}
          type="button"
        >
          Register
        </button>
        <p className={styles.accountText}>Have an account!</p>
        <button className={`${styles.primaryButton} ${styles.secondaryButton}`} onClick={()=>setIsLogin(true)}>
          Log in
        </button>
      </div>
    </div>
  );
}
