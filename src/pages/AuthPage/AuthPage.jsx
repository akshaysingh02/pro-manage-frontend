import React, { useState } from 'react'
import styles from "./AuthPage.module.css"
import auth_image from "../../assets/auth_img.svg"
import LoginComponent from "../../components/Auth/LoginComponent"
import Signup from '../../components/Auth/Signup'
import { Navigate } from 'react-router-dom'

export default function AuthPage() {
  const [isLogin,setIsLogin] = useState(false)
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className={styles.AuthPage}>
        <div className={styles.leftSide}>
            <img className={styles.authImage} src={auth_image} alt="" />
            <h1>Welcome aboard my friend</h1>
            <p>Just a couple of clicks and we start</p>
        </div>
        <div className={styles.rightSide}>
        {isLogin ? <LoginComponent setIsLogin={setIsLogin}/> : <Signup setIsLogin={setIsLogin}/>}
        </div>
    </div>
  )
}
