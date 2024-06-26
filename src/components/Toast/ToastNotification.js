import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = ({ toastMessage }) => {
  React.useEffect(() => {
    if (toastMessage) {
      toast(toastMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        transition: Slide,
      });
    }
  }, [toastMessage]);

  return <ToastContainer />;
};

export default ToastNotification;
