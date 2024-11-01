import "./TodoList.css";
import "../css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";

function TodoList({ showAddTodoItem }) {
    const [isUpdate, setIsUpdate] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const rowList = taskList.map((task) => {
      return (<tr key={task.id}>
          <td className="table-order">{task.id}</td>
          <td className="table-title">{task.title}</td>
          <td className="table-content">{task.content}</td>
          <td className="table-deadline">{task.deadline}</td>
          <td className="table-importance">{task.important}</td>
          <td className="table-modify">
            <Button className="button-icon button-icon-delete-icon" onClick={()=>deleteItem(task.id)}>
              <ion-icon name="trash-outline" size="small"></ion-icon>
            </Button>
            <Button className="button-icon button-icon-modify-icon">
              <ion-icon name="create-sharp" size="small"></ion-icon>
            </Button>
          </td>
      </tr>)
  });


    useEffect(() => {
          // setTaskList(arr);  
          if(isUpdate === true) {
            updateTable();
          };
          return (() => {
            setIsUpdate(false)
          })
    }, [isUpdate]);
    
    

    function updateTable() {
      const arr = JSON.parse(localStorage.getItem("task_list"));
      setTaskList(arr);
    }
    
    function deleteItem(itemId) {
      setIsUpdate(false)
      const newArr = taskList.filter((task) => task.id !== itemId);
      setTaskList(newArr);
      localStorage.setItem("task_list", JSON.stringify(newArr));
    };

  return (
    <div className="todo-list">
      <Button className="button-add-todo-item" onClick={showAddTodoItem}>
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
        <tbody>
          {rowList}
        </tbody>
      </Table>
    </div>
  );
}

export default TodoList;
