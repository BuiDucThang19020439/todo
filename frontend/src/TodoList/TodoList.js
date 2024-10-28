import "./TodoList.css";
import "../css/icon.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState } from "react";

function TodoList({ showAddTodoItem }) {
    let taskList = JSON.parse(localStorage.getItem("task_list"));
    console.log(taskList);
    
    const rowList = taskList.map((task) => {
        return (<tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.content}</td>
            <td>{task.deadline}</td>
            <td>{task.important}</td>
        </tr>)
    });
    // console.log(rowList);
    
  return (
    <div className="todo-list">
      <Button className="button-add-todo-item" onClick={showAddTodoItem}>
        Thêm
      </Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Ngày hoàn thành</th>
            <th>Quan trọng</th>
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
