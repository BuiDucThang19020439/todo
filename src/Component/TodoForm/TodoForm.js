import "./TodoForm.css";
import "../../css/icon.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import { Dropdown } from "react-bootstrap";

function TodoForm({showAddTodoItem}) {
  return (
    <div className="background">
      <Form className="todo-form">
        <h1>Thêm việc</h1>
        <Button type="button" className="button-icon button-icon-close-form" onClick={showAddTodoItem}>
          <ion-icon name="close-sharp" size="large"></ion-icon>
        </Button>
        <FormGroup as={Col} className="form-group">
          <FormLabel>Tiêu đề</FormLabel>
          <InputGroup>
            <Form.Control type="text"></Form.Control>
          </InputGroup>
        </FormGroup>

        <FormGroup as={Col} className="form-group">
          <FormLabel>Nội dung</FormLabel>
          <InputGroup>
            <Form.Control type="text"></Form.Control>
          </InputGroup>
        </FormGroup>

        <Row className="form-row">
          <FormGroup as={Col} className="form-group">
            <FormLabel>Ngày hoàn thành</FormLabel>
            <InputGroup>
              <Form.Control
                type="date"
                defaultValue={() => {
                  Date();
                }}
              ></Form.Control>
            </InputGroup>
          </FormGroup>

          <FormGroup as={Col} className="form-group add-item-dropdown">
            <FormLabel>Độ quan trọng</FormLabel>
            <Dropdown className="">
                <Dropdown.Toggle >Không quan trọng</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Ít quan trọng</Dropdown.Item>
                    <Dropdown.Item>Quan trọng</Dropdown.Item>
                    <Dropdown.Item>Khẩn cấp</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </FormGroup>
        </Row>
      </Form>
    </div>
  );
}

export default TodoForm;
