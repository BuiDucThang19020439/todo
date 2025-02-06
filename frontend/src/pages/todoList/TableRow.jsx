import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch } from "react-redux";
import { showToastMessage } from "reducer/toastSlice";
import { deleteTask, modifyTask } from "api/taskApi";
import moment from "moment";

export default function TableRow({ task, order, getTodoItem }) {
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
  const dl = new Date(task.deadline);
  const [deadline, setDeadline] = useState(dl);
  const handleDeadline = (text) => {
    setDeadline(text);
    handleTaskCompletedView();
  };
  const [important, setImportant] = useState(task.important);
  const handleImportant = (text) => {
    setImportant(text);
  };
  const [completed, setCompleted] = useState(task.completed);
  const handleCompleted = async () => {
    setCompleted((prev) => !prev);
    await modifyTask(task._id, { completed: !completed });
    getTodoItem();
  };  

  const [taskCompletedView, setTaskCompletedView] = useState("");
  const handleTaskCompletedView = () => {
    const currentDate = new Date();
    if (completed) {
      setTaskCompletedView("task-completed");
    } else if (deadline < currentDate) {
      setTaskCompletedView("task-late");
    } else {
      setTaskCompletedView("");
    }
  }
  console.log(taskCompletedView);
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
      await modifyTask(task._id, newPatch);
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
      getTodoItem();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleTaskCompletedView();
  }, [completed, deadline]);

  return (
    <tr>
      <td className={`table-checkbox ${taskCompletedView}`}>
        <input
          className="task-checkbox"
          type="checkbox"
          value={task._id}
          defaultChecked={task.completed}
          onChange={() => handleCompleted()}
        ></input>
      </td>
      <td className={`table-order ${taskCompletedView}`}>{order}</td>
      <td className={`table-title ${taskCompletedView}`}>
        {isEditRow ? (
          <input
            type="text"
            value={title}
            onChange={(event) => handleTitle(event.target.value)}
          ></input>
        ) : (task.title)}
      </td>
      <td className={`table-content ${taskCompletedView}`}>
        {isEditRow ? (
          <input
            type="text"
            value={content}
            onChange={(event) => handleContent(event.target.value)}
          ></input>
        ) : (task.content)}
      </td>
      <td className={`table-deadline ${taskCompletedView}`}>
        {isEditRow ? (
          <input
            type="date"
            value={deadline}
            onChange={(event) => handleDeadline(event.target.value)}
          ></input>
        ) : task.deadline ? (
          moment(task.deadline).format("DD-MM-YYYY")
        ) : ("")}
      </td>
      <td
        className={`table-importance ${taskCompletedView}`}
      >
        {isEditRow ? (
          <select
            value={important}
            onChange={(event) => handleImportant(event.target.value)}
          >
            <option value="Không quan trọng">Không quan trọng</option>
            <option value="Quan trọng">Quan trọng</option>
            <option value="Khẩn cấp">Khẩn cấp</option>
          </select>
        ) : (task.important)}
      </td>
      <td className={`table-modify ${taskCompletedView}`}>
        {isEditRow ? (
          <div>
            <Button
              className="button-icon button-icon-send-icon"
              onClick={() => handleSubmit()}
            ><ion-icon name="paper-plane-sharp" size="small"></ion-icon>
            </Button>
            <Button
              className="button-icon button-icon-exit-modify"
              onClick={() => toggleEditRow()}
            ><ion-icon name="close-sharp" size="small"></ion-icon>
            </Button>
          </div>
        ) : (
          <div>
            <Button
              className="button-icon button-icon-modify-icon"
              onClick={() => toggleEditRow()}
            ><ion-icon name="create-sharp" size="small"></ion-icon>
            </Button>
            <Button
              className="button-icon button-icon-delete-icon"
              onClick={() => deleteTodoItem(task._id)}
            ><ion-icon name="trash-outline" size="small"></ion-icon>
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}
