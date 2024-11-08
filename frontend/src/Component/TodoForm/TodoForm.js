import "./TodoForm.css";
import "../../css/icon.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../../reducer/toastSlice";
import { getTodoData, addTodoItem } from "../../reducer/todoTableSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

function TodoForm({ showAddTodoItem }) {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const [importance, setImportance] = useState("Không quan trọng");
  const taskList = useSelector((state) => 
     state.handleTodoTable.taskList
  ); 

  const onSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      handleChange();
    }
  };
  /**
   * Hàm handleChange thêm 1 item vào tasklist trên db.
   * id mới của item là id của phần tử cuối cùng cộng 1
   */
  const handleChange = () => {
    let arrLength = taskList.length;
    let newId = arrLength !==0 ? taskList[arrLength - 1].id + 1 : 1;
    dispatch(addTodoItem(
      {
        id: newId,
        userId: 1,
        title: title,
        content: content,
        deadline: deadline,
        important: importance,
        completed: false,

      },
    ))
    showAddTodoItem();
    dispatch(
      showToastMessage({
        show: true,
        title: "Thành Công",
        message: "Thêm thành công nhiệm vụ",
        variant: "success",
      })
    );
  };

  return (
    <div className="background">
      <Form
        noValidate
        validated={validated}
        className="todo-form"
        onSubmit={onSubmit}
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
          <Form.Label>Nội dung</Form.Label>
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
