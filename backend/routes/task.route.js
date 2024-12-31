const express = require("express");
const router = express.Router();
const {
  getTaskList,
  getATask,
  addTask,
  modifyTask,
  deleteTask,
  filterList,
} = require("../controllers/task.controller.js");

// lấy danh sách các task
router.get("/", getTaskList);
router.get("/:id", getATask);

// thêm một task
router.post("/", addTask);

// sửa đổi một task
router.patch("/:id", modifyTask);

// xóa một task
router.delete("/:id", deleteTask);

//lọc và phân trang
router.get(
  "/userId/:userId/page/:currentPage/limit/:numberItemAPage/option/:filterOption/word/:filterWord",
  filterList
);
module.exports = router;
