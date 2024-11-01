import "./TodoForm.css";
import "../../css/icon.css";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function TodoForm({ showAddTodoItem }) {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const [importance, setImportance] = useState("Không quan trọng");
  let taskList = JSON.parse(localStorage.getItem("task_list")) || [];

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      handleChange();
    }
  };
  const handleChange = () => {
    let arrLength = taskList.length + 1;
    taskList = [
      ...taskList,
      {
        id: arrLength,
        userId: 1,
        title: title,
        content: content,
        deadline: deadline,
        important: importance,
      },
    ];
    localStorage.setItem("task_list", JSON.stringify(taskList));
    showAddTodoItem();
  };

  return (
    <div className="background">
      <Form
        noValidate
        validated={validated}
        className="todo-form"
        onSubmit={handleSubmit}
      >
        <h3>Thêm việc</h3>
        <Button
          type="button"
          className="button-icon button-icon-close-form"
          onClick={showAddTodoItem}
        >
          <ion-icon name="close-sharp" size="large"></ion-icon>
        </Button>

        <Form.Group 
          as={Col} 
          className="form-group add-title" 
          controlId="add-title"
        >
          <Form.Label>Tiêu đề</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề"
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Tiêu đề không hợp lệ
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          className="form-group add-content"
          controlId="add-content"
        >
          <Form.Label >Nội dung</Form.Label>
          <InputGroup hasValidation> 
            <Form.Control
              type="text"
              placeholder="Nhập nội dung công việc"
              required
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Nội dung không được để trống.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Row className="form-row">
          <Form.Group as={Col} className="form-group" controlId="add-deadline">
            <Form.Label>Hạn hoàn thành</Form.Label>
            <InputGroup>
              <Form.Control
                type="date"
                defaultValue={() => {
                  Date();
                }}
                onChange={(event) => {
                  setDeadline(event.target.value);
                }}
              ></Form.Control>
            </InputGroup>
          </Form.Group>

          <Form.Group
            as={Col}
            className="form-group add-item-dropdown"
            controlId="add-importance"
          >
            <Form.Label>Độ quan trọng</Form.Label>
            <Form.Select
              aria-label="select-important"
              onChange={(event) => {
                setImportance(event.target.value);
              }}
            >
              <option value="Không quan trọng">Không quan trọng</option>
              <option value="Ít quan trọng">Ít quan trọng</option>
              <option value="Quan trọng">Quan trọng</option>
              <option value="Khẩn cấp">Khẩn cấp</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button className="button-submit-todo-item" type="submit">
          Gửi
        </Button>
      </Form>
    </div>
  );
}

export default TodoForm;
