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
    const response = await axios.get(reqUrl, {
      params: { filter: selectedFilter },
    });
    return response;
  } catch (error) {
    console.log("Unable to Fetch Tasks", error);
    return error.response.data;
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const reqUrl = `${backendUrl}/update-status`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, {
      taskId: taskId,
      newStatus,
    });
    return response;
  } catch (error) {
    console.log("Unable to update task status", error);
    return error.response.data;
  }
};

export const updateTaskDetails = async (taskId, payLoad) => {
  try {
    const reqUrl = `${backendUrl}/update-task/${taskId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, payLoad);
    return response;
  } catch (error) {
    console.log("Unable to update task details", error);
    return error.response.data;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const reqUrl = `${backendUrl}/delete-task/${taskId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log("Unable to update task details", error);
    return error.response.data;
  }
};

export const getSharedTask = async (uniqueLink) => {
  try {
    const reqUrl = `${backendUrl}/share/${uniqueLink}`;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    }
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const reqUrl = `${backendUrl}/get-analytics`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response.status;
    }
    throw error;
  }
};
