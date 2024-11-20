import "./TodoList.css";
import "../css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../reducer/toastSlice";
import { toggleComplete } from "../reducer/todoTableSlice";
import { getTaskList, deleteTask } from "../api/api";
import { useState, useEffect } from "react";

function TodoList({ toggleAddItemForm }) {
  const dispatch = useDispatch();
  // Lấy thông tin người đăng nhập hiện tại
  const user = useSelector((state) => state.handleLogin.loggedUserInfo);
  // order là số thứ tự hàng hiện trên bảng
  let order = 0;

  // taskList là danh sách các hàng lấy từ database
  const [taskList, setTaskList] = useState([]);
  /**
   * Hàm getTodoItem lấy dữ liệu từ db về và lọc ra những kết quả phù hợp với người đăng nhập
   */
  const getTodoItem = async () => {
    try {
      const response = await getTaskList();
      response.filter((task) => task.userId === user.id);
      setTaskList(response);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Hàm deleteTodoItem gọi api xóa (lưu ở file api.js) nhận param là id hiện tại của task
   *  id
   */
  const deleteTodoItem = async (id) => {
    await deleteTask(id);
    dispatch(
      showToastMessage({
        show: true,
        title: "Thành Công",
        message: "Xóa thành công nhiệm vụ",
        variant: "success",
      })
    );
  };
  useEffect(() => {
    getTodoItem();
  }, [taskList]);

  // rowList: chuyển dữ liệu tasklist thành html để hiện ra giao diện
  const rowList =
    taskList.map((task) => {
      return (
        <tr key={task.id}>
          <td
            className={`table-checkbox ${task.completed ? "task-completed" : ""
              }`}
          >
            <input
              type="checkbox"
              value={task.id}
              defaultChecked={task.completed}
              onChange={() => handleCompleteCheck(task.id, !task.completed)}
            ></input>
          </td>
          <td
            className={`table-order ${task.completed ? "task-completed" : ""}`}
          >
            {++order}
          </td>
          <td
            className={`table-title ${task.completed ? "task-completed" : ""}`}
          >
            {task.title}
          </td>
          <td
            className={`table-content ${task.completed ? "task-completed" : ""
              }`}
          >
            {task.content}
          </td>
          <td
            className={`table-deadline ${task.completed ? "task-completed" : ""
              }`}
          >
            {task.deadline}
          </td>
          <td
            className={`table-importance ${task.completed ? "task-completed" : ""
              }`}
          >
            {task.important}
          </td>
          <td
            className={`table-modify ${task.completed ? "task-completed" : ""}`}
          >
            <Button
              className="button-icon button-icon-delete-icon"
              onClick={() => deleteTodoItem(task.id)}
            >
              <ion-icon name="trash-outline" size="small"></ion-icon>
            </Button>
            <Button className="button-icon button-icon-modify-icon">
              <ion-icon name="create-sharp" size="small"></ion-icon>
            </Button>
          </td>
        </tr>
      );
    }) || [];

  /**
   * hàm handleCompleteCheck xử lý việc check hoàn thành
   */
  const handleCompleteCheck = (id, completed) => {
    dispatch(toggleComplete({ id, completed }));
  };

  return (
    <>
      {user.loginStatus === true && (
        <div className="todo-list">
          <Button className="button-add-todo-item" onClick={toggleAddItemForm}>
            Thêm
          </Button>
          <Table striped bordered hover responsive>
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
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                  </Pagination>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      )}
    </>
  );
}

export default TodoList;
