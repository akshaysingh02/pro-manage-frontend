import React, { useEffect, useState } from "react";
import styles from "./authStyles.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";

export default function LoginComponent({setIsLogin}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    setErrors({ email: "", password: "" });
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const result = await loginUser(formData);
    if (result) {
      navigate("/dashboard");
      console.log(result);
    } else {
      setErrors({
        ...errors,
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <h2 className={styles.authHeading}>Login</h2>
      <div className={styles.loginInputWrapper}>
        <input
          className={styles.inputText}
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.loginInputWrapper}>
        <input
          className={`${styles.inputText} ${styles.inputPassword}`}
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <span className={styles.error}>{errors.password}</span>
        )}
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.primaryButton} onClick={handleSubmit}>
          Log in
        </button>
        <p className={styles.accountText}>Have no account yet?</p>
        <button
          className={`${styles.primaryButton} ${styles.secondaryButton}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
    </div>
  );
}
