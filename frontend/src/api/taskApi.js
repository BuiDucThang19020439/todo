import axios from "axios";
const baseURL = "http://localhost:3001/api/taskList/";

/**
 * Hàm getTaskList get api trả về toàn bộ task trong db
 * @returns trả về data: 1 mảng các task
 */
export const getTaskList = async () => {
  let response;
  try {
    response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm getATask get api để trả về 1 task theo id tương ứng
 * @param  id : id của task cần lấy
 * @returns 1 task có id tương ứng
 */
export const getATask = async (id) => {
  try {
    let response = await axios.get(baseURL + id);
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
    await axios.delete(baseURL + id);
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
    await axios.post(baseURL, {
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
 * hàm modifyTask sửa nội dung của 1 task
 * khi sử dụng patch thì chỉ thay đổi trường được chỉ định
 * nếu dùng put thì sẽ thay thế toàn bộ task, trường nào ko được chỉ định sẽ bị xóa
 */
export const modifyTask = async (id, data) => {
  try {
    await axios.patch(baseURL + id, data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Hàm filterList lọc danh sách và phân trang
 * id: userId hay id của người dùng đăng nhập
 * page: currentPage hay trang hiện tại
 * limit: numberItemAPage hay số hàng trong 1 trang
 * filterWord từ khóa tìm kiếm
 * filterOption tìm kiếm theo trường nào
 */

export const filterPaginationList = async (
  id,
  page,
  limit,
  filterOption,
  filterWord,
) => {
  if ((filterOption === "content" || filterOption === "title") && filterWord === "") {
    filterOption = ":filterOption";
  }
  if (filterWord === "") {
    filterWord = ":filterWord";
  }
  try {
    const response = await axios.get(`${baseURL}userId/${id}/page/${page}/limit/${limit}/option/${filterOption}/word/${filterWord}`);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};
