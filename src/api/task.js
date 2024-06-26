import axios from "axios";
const backendUrl = "http://localhost:5001";

export const createTask = async (taskPayload) => {
  try {
    const reqUrl = `${backendUrl}/create-task`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, taskPayload);
    return response;
  } catch (error) {
    console.log("Unable to create Task", error);
    return error.response.data;
  }
};

export const getTasks = async (selectedFilter) => {
  try {
    const reqUrl = `${backendUrl}/get-all-tasks`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl,{
        params: { filter: selectedFilter },
    });
    return response;
  } catch (error) {
    console.log("Unable to Fetch Tasks", error);
    return error.response.data;
  }
};
