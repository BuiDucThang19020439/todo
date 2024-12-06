import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../reducer/toastSlice";
import { deleteTask, toggleCheckBox, modifyTask } from "../api/api";

export default function TableRow({ task, order, getTodoItem, setCurrentPage }) {
  const dispatch = useDispatch();
  /**
   * isEditRow là state dùng để bật tắt chức năng sửa thông tin một hàng
   */
  const [isEditRow, setIsEditRow] = useState(false);
  const toggleEditRow = () => {
    setIsEditRow(!isEditRow);
  };
  const [title, setTitle] = useState(task.title);
  const handleTitle = (text) => {
    setTitle(text);
  };
  const [content, setContent] = useState(task.content);
  const handleContent = (text) => {
    setContent(text);
  };
  const [deadline, setDeadline] = useState(task.deadline);
  const handleDeadline = (text) => {
    setDeadline(text);
  };
  const [important, setImportant] = useState(task.important);
  const handleImportant = (text) => {
    setImportant(text);
  };

  const handleSubmit = async () => {
    let newPatch = {};
    if (task.title !== title) newPatch.title = title;
    if (task.content !== content) newPatch.content = content;
    if (task.deadline !== deadline) newPatch.deadline = deadline;
    if (task.important !== important) newPatch.important = important;
    if (Object.keys(newPatch).length > 0) {
      await modifyTask(task.id, newPatch);
    }
    toggleEditRow();
    getTodoItem();
  };
  /**
   * Hàm deleteTodoItem gọi api xóa (lưu ở file api.js) nhận param là id hiện tại của task
   */
  const deleteTodoItem = async (id) => {
    try {
      await deleteTask(id);
      dispatch(
        showToastMessage({
          show: true,
          title: "Thành Công",
          message: "Xóa thành công nhiệm vụ",
          variant: "success",
        })
      );
      setCurrentPage(1);
      getTodoItem();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = async (task) => {
    await toggleCheckBox(task.id, task.completed);
    getTodoItem();
  };
  return (
    <tr>
      <td
        className={`table-checkbox ${task.completed ? "task-completed" : ""}`}
      >
        <input
          className="task-checkbox"
          type="checkbox"
          value={task.id}
          defaultChecked={task.completed}
          onChange={() => handleCheckbox(task)}
        ></input>
      </td>
      <td className={`table-order ${task.completed ? "task-completed" : ""}`}>
        {order}
      </td>
      <td className={`table-title ${task.completed ? "task-completed" : ""}`}>
        {isEditRow ? (
          <input
            type="text"
            value={title}
            onChange={(event) => handleTitle(event.target.value)}
          ></input>
        ) : (
          task.title
        )}
      </td>
      <td className={`table-content ${task.completed ? "task-completed" : ""}`}>
        {isEditRow ? (
          <input
            type="text"
            value={content}
            onChange={(event) => handleContent(event.target.value)}
          ></input>
        ) : (
          task.content
        )}
      </td>
      <td
        className={`table-deadline ${task.completed ? "task-completed" : ""}`}
      >
        {isEditRow ? (
          <input
            type="date"
            value={deadline}
            onChange={(event) => handleDeadline(event.target.value)}
          ></input>
        ) : (
          task.deadline
        )}
      </td>
      <td
        className={`table-importance ${task.completed ? "task-completed" : ""}`}
      >
        {isEditRow ? (
          <select
            value={important}
            onChange={(event) => handleImportant(event.target.value)}
          >
            <option value="Không quan trọng">Không quan trọng</option>
            <option value="Ít quan trọng">Ít quan trọng</option>
            <option value="Quan trọng">Quan trọng</option>
            <option value="Khẩn cấp">Khẩn cấp</option>
          </select>
        ) : (
          task.important
        )}
      </td>
      <td className={`table-modify ${task.completed ? "task-completed" : ""}`}>
        {isEditRow ? (
          <>
            <Button
              className="button-icon button-icon-send-icon"
              onClick={() => handleSubmit()}
            >
              <ion-icon name="paper-plane-sharp" size="small"></ion-icon>
            </Button>
            <Button
              className="button-icon button-icon-exit-modify"
              onClick={() => toggleEditRow()}
            >
              <ion-icon name="close-sharp" size="small"></ion-icon>
            </Button>
          </>
        ) : (
          <>
            <Button
              className="button-icon button-icon-modify-icon"
              onClick={() => toggleEditRow()}
            >
              <ion-icon name="create-sharp" size="small"></ion-icon>
            </Button>
            <Button
              className="button-icon button-icon-delete-icon"
              onClick={() => deleteTodoItem(task.id)}
            >
              <ion-icon name="trash-outline" size="small"></ion-icon>
            </Button>
          </>
        )}
      </td>
    </tr>
  );
}
