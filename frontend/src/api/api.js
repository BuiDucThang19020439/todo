import axios from "axios";
const baseURL = "http://localhost:3001/";

export const getTaskList = async () => {
  let response;
  try {
    response = await axios.get(baseURL + "taskList");
  } catch (error) {
    console.log(error);
  }
  return response.data;
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${baseURL}taskList/${id}`);    
  } catch (error) {
    console.log(error);
  }
};

export const addTask = async (task) => {
  try {
    await axios.post(baseURL + "taskList", {
      id: task.id,
      userId: task.userId,
      title: task.title,
      content: task.content,
      deadline: task.deadline,
      important: task.important,
      completed: false,
    });
  } catch (error) {
    console.log(error);
  }
};
