const Task = require("../models/task.model");
const asyncHanlder = require('express-async-handler');

// Hàm getTaskList lấy danh sách tất cả các nhiệm vụ của một người dùng
const getTaskList = asyncHanlder(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
});

// Hàm getATask trả về một task theo id
const getATask = asyncHanlder( async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Id không hợp lệ");
  }
  const task = await Task.findById(id);
  res.status(200).json(task);
});

// Hàm addTask thêm một task mới vào danh sách
const addTask = asyncHanlder( async (req, res) => {
  const task = await Task.create(req.body);
  res.status(200).json(task);
});

// Hàm modifyTask chỉnh sửa một phần nội dung của một task, những gì cần sửa ở trong req.body
// Tương đương với 2 hàm toggleCheckbox và modifyTask bên frontend, vì đều dùng patch
const modifyTask = asyncHanlder( async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      res.status(404);
      throw new Error("Không tìm thấy nhiệm vụ");
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
});

// Hàm deleteTask cho phép xóa 1 task theo id
const deleteTask = asyncHanlder( async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) {
    res.status(400);
    throw new Error("Không tìm thấy nhiệm vụ");
  }
  await task.deleteOne();
  res.status(200).json({ message: "Xóa nhiệm vụ thành công" });
});

/**
 * hàm filterList sẽ lọc ra các task thỏa mãn filterWord và filterOption
 */
const filterList = async (req, res) => {
  try {
    // lấy từ params
    const id = parseInt(req.params.userId);
    const currentPage = parseInt(req.params.currentPage) || 1;
    const numberItemAPage = parseInt(req.params.numberItemAPage) || 5;
    const filterWord = String(req.params.filterWord);
    const filterOption = String(req.params.filterOption);

    let query  = {}
      switch (filterOption) {
        case "content":
        case "title":
          query[filterOption] = {$regex: filterWord, $options:'i'};
          break;
        case "completed":
          query.completed = true;
          break; 
        case "not-completed":
          query.completed = false;
          break; 
        case "not-important":
          query.important = "Không quan trọng";
          break;
        case "important":
          query.important = "Quan trọng";
          break;
        case "urgent":
          query.important = "Khẩn cấp";
          break;
        default:
          console.log("trường hợp mặc định");
          break;
      }
    query.userId = id;
    console.log(query)
    /**
     * skip: bỏ qua các phần tử từ vị trí đầu tiên đến skip
     * totalTask được lấy bằng countDocuments, ko phải lấy tất cả danh sách về rồi mới đếm nên ko lo hiệu suất
     * totalPage: Tổng số trang
     */
    const skip = (currentPage - 1) * numberItemAPage;
    const totalTask = await Task.countDocuments(query);
    const totalPage = Math.ceil(totalTask / numberItemAPage);

    const taskList = await Task.find(query)
      .sort({deadline: 1})
      .skip(skip)
      .limit(numberItemAPage) || [];
    res.status(200).json({
      taskList,
      totalTask,
      totalPage,
      currentPage: currentPage,
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi bên server" });
  }
};

module.exports = {
  getTaskList,
  getATask,
  addTask,
  modifyTask,
  deleteTask,
  filterList,
};
