import "./LoginForm.css";
import "../../css/icon.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../../reducer/toastSlice";
import { userLogin } from "../../reducer/loginSlice";

/**
 * Hàm showLoginForm nhận từ Home.js
 */
function LoginForm({ showLoginForm }) {
  const dispatch = useDispatch();
  /**
   * state validate dùng để validate dữ liệu
   */
  const [validated, setValidate] = useState(false);

  /**
   * state của id đăng nhập
   */
  const [accountId, setAccountId] = useState("");
  /**
   * state của mật khẩu đăng nhập
   */
  const [accountPassword, setAccountPassword] = useState("");

  /**
   * hàm xử lý việc gửi thông tin từ form, lấy từ boostrap
   */
  const handleSubmitLoginForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidate(true);
      dispatch(userLogin({ id: accountId, password: accountPassword }));
      dispatch(
        showToastMessage({
          show: true,
          title: "Đăng nhập thành công",
          message: "Chào mừng",
          variant: "success",
        })
      );
      showLoginForm();
    }
  };

  return (
    <div className="background">
      <Form
        className="login-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmitLoginForm}
      >
        <h1>Đăng nhập</h1>
        <Button
          type="button"
          className="button-icon button-icon-close-form"
          onClick={showLoginForm}
        >
          <ion-icon name="close-sharp" size="large"></ion-icon>
        </Button>
        <Form.Group as={Col} className="form-group" controlId="account-id">
          <Form.Label>ID đăng nhập</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Nhập ID đăng nhập"
              required
              onChange={(event) => {
                setAccountId(event.target.value);
              }}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              ID đăng nhập không hợp lệ
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group
          as={Col}
          className="form-group"
          controlId="account-password"
        >
          <Form.Label>Mật khẩu</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              required
              onChange={(event) => {
                setAccountPassword(event.target.value);
              }}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Mật khẩu không hợp lệ
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Button type="submit">Đăng Nhập</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default LoginForm;
