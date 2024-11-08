import "./TodoList.css";
import "../css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../reducer/toastSlice";
import {
  toggleComplete,
  delTodoItem,
} from "../reducer/todoTableSlice";

import ToastMsg from "../Component/Toast/ToastMsg";

function TodoList({ showAddTodoItem }) {
  // order là số thứ tự hàng hiện trên bảng
  let order = 0;
  const dispatch = useDispatch();

  // taskList là danh sách các hàng lấy từ store
  const taskList = useSelector((state) => {
    return state.handleTodoTable.taskList;
  });

  // rowList: chuyển dữ liệu tasklist thành html để hiện ra giao diện
  const rowList = taskList.map((task) => {
    return (
      <tr key={task.id}>
        <td className={`table-checkbox ${task.completed ? "task-completed" : ""}`}>
          <input type="checkbox" value={task.id} defaultChecked={task.completed} onChange={() => handleCompleteCheck(task.id, !task.completed)}></input>
        </td>
        <td className={`table-order ${task.completed ? "task-completed" : ""}`}>
          {++order}
        </td>
        <td className={`table-title ${task.completed ? "task-completed" : ""}`}>{task.title}</td>
        <td className={`table-content ${task.completed ? "task-completed" : ""}`}>{task.content}</td>
        <td className={`table-deadline ${task.completed ? "task-completed" : ""}`}>{task.deadline}</td>
        <td className={`table-importance ${task.completed ? "task-completed" : ""}`}>{task.important}</td>
        <td className={`table-modify ${task.completed ? "task-completed" : ""}`}>
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

  /**
   * itemId: id lấy từ hàng
   * hàm deleteItem xóa 1 hàng theo id cho trc
   */
  const deleteItem = (itemId) => {
    dispatch(delTodoItem(itemId));
    dispatch(
      showToastMessage({
        show: true,
        title: "Thành Công",
        message: "Xóa thành công nhiệm vụ",
        variant: "success",
      })
    );
  };

  /**
   * hàm handleCompleteCheck xử lý việc check hoàn thành
   */
  const handleCompleteCheck = (id, completed) => {
    dispatch(toggleComplete({ id, completed }))
  }

  return (
    <div className="todo-list">
      <Button className="button-add-todo-item" onClick={showAddTodoItem}>
        Thêm
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="table-checkbox">
              <input type="checkbox"></input>
            </th>
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
    </div>
  );
}

export default TodoList;
