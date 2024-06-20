import axios from "axios";
const backendUrl = "http://localhost:5001/auth"


export const registerUser = async ({ name, email, password }) => {
    try {
      const regUrl = `${backendUrl}/signup`;
      const response = await axios.post(regUrl, { name, email, password });
      return response.status;
    } catch (error) {
      if (error.response) {
        return error.response.status;
      }
      throw error;
    }
  };
  
  export const loginUser = async ({ email, password }) => {
    try {
      const regUrl = `${backendUrl}/login`;
      const response = await axios.post(regUrl, { email, password });
      if (response.data?.token) {
        localStorage.setItem("token", JSON.stringify(response.data?.token));
        localStorage.setItem("name", JSON.stringify(response.data?.name));
        localStorage.setItem("userId", JSON.stringify(response.data?.userId));
      }
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };