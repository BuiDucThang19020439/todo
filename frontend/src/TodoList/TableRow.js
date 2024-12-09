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
  /**
   * title, content, deadline và important là các state lưu giá trị cho mục đích chỉnh sửa một nhiệm vụ
   */
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

  /**
   * hàm handleSubmit là hàm cập nhật một nhiệm vụ (một hàng)
   * nếu một ô có thay đổi, thì lưu thay đổi đó vào object newPatch, chỉ update những ô thay đổi
   * ở đây dùng patch thay vì put vì patch chỉ sửa đổi những key được gửi, không có key thì thêm mới
   * còn put sẽ thay mới hoàn toàn object được chọn, key nào không được gửi trong put thì xóa luôn
   */
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

  /**
   * hàm handleCheckbox phụ trách việc set key completed cho nhiệm vụ
   * param là task cần thay đổi
   * cần async await để đồng bộ dữ liệu lưu trên db và dự liệu hiển thị trên màn hình,
   * nếu không màn hình hiển thị sẽ bị chậm mật một bước
   */
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
          <div>
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
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </td>
    </tr>
  );
}
