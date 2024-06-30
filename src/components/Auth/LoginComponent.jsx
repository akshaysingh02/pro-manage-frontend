import React, { useEffect, useState } from "react";
import styles from "./authStyles.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import eyeIcon from "../../assets/eye_icon.svg"
import loader from "../../assets/loader.svg"

export default function LoginComponent({setIsLogin}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const [showLoader, setShowLoader] = useState(false);
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
    setShowLoader(true)
    const result = await loginUser(formData);
    if (result) {
      navigate("/");
      setShowLoader(false)
      console.log(result);
    } else {
      setErrors({
        ...errors,
        email: "Invalid credentials",
        password: "Invalid credentials",
      });
      setShowLoader(false)
    }
  };

  return (
    <>
    {showLoader && (
        <div className={styles.LoaderWrapper}>
          <img src={loader} alt="loading" />
        </div>
      )}
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
      <div className={styles.inputWrapperFix}>
        <input
          className={`${styles.inputText} ${styles.inputPassword}`}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div
            className={styles.eyeWrapper}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              className={styles.eye}
              src={eyeIcon}
              alt="passwordVisibility"
            />
          </div>
      </div>
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
    </>
  );
}
