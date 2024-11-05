import "./TodoList.css";
import "../css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../reducer/toastSlice";
import ToastMsg from "../Component/Toast/ToastMsg";

function TodoList({ showAddTodoItem }) {
  // order là số thứ tự hàng hiện trên bảng
  let order = 0;
  const dispatch = useDispatch();
  // isUpdate dùng để xét có cập nhật bảng hay không
  const [isUpdate, setIsUpdate] = useState(true);
  const setIsUpdateTruthy = () => {
    setIsUpdate(true);
  }

  // taskList là danh sách các hàng lấy từ localStorage
  const [taskList, setTaskList] = useState([]);

  // rowList: chuyển dữ liệu tasklist thành html để hiện ra giao diện
  const rowList = taskList.map((task) => {
    return (
      <tr key={task.id}>
        <td className="table-order">{++order}</td>
        <td className="table-title">{task.title}</td>
        <td className="table-content">{task.content}</td>
        <td className="table-deadline">{task.deadline}</td>
        <td className="table-importance">{task.important}</td>
        <td className="table-modify">
          <Button
            className="button-icon button-icon-delete-icon"
            onClick={() => deleteItem(task.id)}
          >
            <ion-icon name="trash-outline" size="small"></ion-icon>
          </Button>
          <Button className="button-icon button-icon-modify-icon">
            <ion-icon name="create-sharp" size="small"></ion-icon>
          </Button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    if (isUpdate === true) {
      updateTable();
    }
    return () => {
      setIsUpdate(false);
    };
  }, [isUpdate]);

  /**
   * hàm updateTable dùng để cập nhật bảng, gán chuỗi json đã parse cho tasklist
   */
  function updateTable() {
    const arr = JSON.parse(localStorage.getItem("task_list"));
    setTaskList(arr);
  }

  /**
   * itemId: id lấy từ hàng
   * hàm deleteItem xóa 1 hàng theo id cho trc
   */
  function deleteItem(itemId) {
    setIsUpdate(false);
    const newArr = taskList.filter((task) => task.id !== itemId);
    setTaskList(newArr);
    localStorage.setItem("task_list", JSON.stringify(newArr));
    dispatch(
      showToastMessage({
        show: true,
        title: "Thành Công",
        message: "Xóa thành công nhiệm vụ",
        variant: "success",
      })
    );
  }

  return (
    <div className="todo-list">
      <Button
        className="button-add-todo-item"
        onClick={showAddTodoItem}
      >
        Thêm
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-order">#</th>
            <th className="table-title">Tiêu đề</th>
            <th className="table-content">Nội dung</th>
            <th className="table-deadline">Hạn</th>
            <th className="table-importance">Quan trọng</th>
            <th className="table-modify">Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>{rowList}</tbody>
      </Table>
      <ToastMsg></ToastMsg>
    </div>
  );
}

export default TodoList;
