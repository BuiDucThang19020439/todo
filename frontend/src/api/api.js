import axios from "axios";
const baseURL = "http://localhost:3001/api/";

/**
 * Hàm getTaskList get api trả về toàn bộ task trong db
 * @returns trả về data: 1 mảng các task
 */
export const getTaskList = async () => {
  let response;
  try {
    response = await axios.get(baseURL + "taskList");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm getATask get api để trả về 1 task theo id tương ứng
 * @param {*} id : id của task cần lấy
 * @returns 1 task có id tương ứng
 */
export const getATask = async (id) => {
  try {
    let response = await axios.get(baseURL + "taskList" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm deleteTask được sử dụng để xóa 1 nhiệm vụ
 * @param {*} id : id của task được chọn để xóa
 */
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${baseURL}taskList/${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * hàm addTask thêm mới 1 nhiệm vụ
 * @param {*} task: task mới được thêm vào
 */
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

/**
 * hàm toggleCheckBox bật tắt trạng thái hoàn thành (completed) của task
 * khi sử dụng patch thì chỉ thay đổi trường được chỉ định
 * nếu dùng put thì sẽ thay thế toàn bộ task, trường nào ko được chỉ định sẽ bị xóa
 * @param {*} id : id của task được chọn
 * @param {*} isChecked : trạng thái được check hay chưa của ô checkbox
 */
export const toggleCheckBox = async (id, isChecked) => {
  try {
    await axios.patch(baseURL + "taskList/" + id, { completed: !isChecked });
  } catch (error) {
    console.log(error);
  }
};

/**
 * hàm modifyTask sửa nội dung của 1 task
 */
export const modifyTask = async (id, data) => {
  try {
    await axios.patch(baseURL + "taskList/" + id, data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * hàm pagination lấy về các task sau khi đã phân trang
 */
export const paginateList = async (id, page, limit) => {
  try {
    const response = await axios.get(
      `${baseURL}taskList/userId/${id}/page/${page}/limit/${limit}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
