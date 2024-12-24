const express = require("express");
const router = express.Router();
const {
  getTaskList,
  getATask,
  addTask,
  modifyTask,
  deleteTask,
  paginateTask,
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

// phân trang
router.get(
  "/userId/:userId/page/:currentPage/limit/:numberItemAPage",
  paginateTask
);

//lọc
router.get(
  "/userId/:userId/page/:currentPage/limit/:numberItemAPage/filterOption/:filterOption/filterWord/:filterWord",
  filterList
);
module.exports = router;
