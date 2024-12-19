const Task = require("../models/task.model");

// Hàm getTaskList lấy danh sách tất cả các nhiệm vụ của một người dùng
const getTaskList = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm getATask trả về một task theo id
const getATask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm addTask thêm một task mới vào danh sách
const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm modifyTask chỉnh sửa một phần nội dung của một task, những gì cần sửa ở trong req.body
// Tương đương với 2 hàm toggleCheckbox và modifyTask bên frontend, vì đều dùng patch
const modifyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hàm deleteTask cho phép xóa 1 task theo id
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// hàm phân trang
//nhận vào các giá trị
const paginateTask = async (req, res) => {
  const id = parseInt(req.params.userId);
  const currentPage = parseInt(req.params.currentPage) || 1; // trang hiện tại
  const numberItemAPage = parseInt(req.params.numberItemAPage) || 5; // số item 1 trang
  const skip = (currentPage - 1) * numberItemAPage;
  const totalTask = await Task.countDocuments({ userId: id });
  const totalPage = Math.ceil(totalTask / numberItemAPage);

  const taskList = await Task.find({ userId: id })
    .skip(skip)
    .limit(numberItemAPage);

  res.json({
    taskList,
    totalTask,
    totalPage,
    currentPage: currentPage,
  });
  try {
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

module.exports = {
  getTaskList,
  getATask,
  addTask,
  modifyTask,
  deleteTask,
  paginateTask,
};
