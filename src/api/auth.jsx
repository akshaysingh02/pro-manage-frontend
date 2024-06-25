import axios from "axios";
const backendUrl = "http://localhost:5001";

export const registerUser = async ({ name, email, password }) => {
  try {
    const regUrl = `${backendUrl}/auth/signup`;
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
    const regUrl = `${backendUrl}/auth/login`;
    const response = await axios.post(regUrl, { email, password });
    if (response.data?.token) {
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      localStorage.setItem("name", JSON.stringify(response.data?.name));
      localStorage.setItem("userId", JSON.stringify(response.data?.userId));
      localStorage.setItem(
        "userEmail",
        JSON.stringify(response.data?.userEmail)
      );
    }
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPeople = async ({ email }) => {
  try {
    const regUrl = `${backendUrl}/create-collaborator`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(regUrl, { email });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    }
    throw error;
  }
};
export const updateUser = async ({ name, email, oldPassword, newPassword }) => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const regUrl = `${backendUrl}/auth/update-user/${userId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(regUrl, {
      name,
      email,
      oldPassword,
      newPassword,
    });
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    }
    throw error;
  }
};

export const getUserDetails = async () =>{
  try {
    const regUrl = `${backendUrl}/auth/get-user-details`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(regUrl);
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const getCollabDetails = async()=>{
  try {
    const regUrl = `${backendUrl}/get-collaborators`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(regUrl);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    }
    throw error;
  }
}
