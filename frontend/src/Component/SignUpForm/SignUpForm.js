import "./SignUpForm.css";
import "../../css/icon.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../reducer/loginSlice.js";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function SignUpForm({ showSignUpForm }) {
  const [validated, setValidate] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPhoneNumber, setAccountPhoneNumber] = useState("");

  const dispatch = useDispatch();
  let userList = useSelector((state) => state.handleLogin.userList);

  const handleSignUpForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidate(true);
      let arrLength = userList.length;
      let newId = arrLength !== 0 ? userList[arrLength - 1].id + 1 : 1;
      dispatch(
        addUser({
          id: newId,
          userId: accountId,
          username: accountName,
          password: accountPassword,
          phone: accountPhoneNumber,
          email: accountEmail,
        })
      );
      showSignUpForm();
    }
  };

  return (
    <div className="background">
      <Form
        className="sign-up-form"
        noValidate
        validated={validated}
        onSubmit={handleSignUpForm}
      >
        <h1>Đăng ký</h1>
        <Button
          type="button"
          className="button-icon button-icon-close-form"
          onClick={showSignUpForm}
        >
          <ion-icon name="close-sharp" size="large"></ion-icon>
        </Button>

        <Row className="form-row">
          <Form.Group as={Col} className="form-group" controlId="account-id">
            <Form.Label>ID đăng nhập</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Nhập ID đăng nhập"
                onChange={(event) => {
                  setAccountId(event.target.value);
                }}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                ID đăng nhập không hợp lệ
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} className="form-group" controlId="account-name">
            <Form.Label>Tên đăng nhập</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Nhập tên đăng nhập"
                onChange={(event) => {
                  setAccountName(event.target.value);
                }}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Tên đăng nhập không hợp lệ
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group
            as={Col}
            className="form-group"
            controlId="account-password"
          >
            <Form.Label>Mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                onChange={(event) => {
                  setAccountPassword(event.target.value);
                }}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Mật khẩu không hợp lệ
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} className="form-group" controlId="account-email">
            <Form.Label>Địa chỉ email</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                onChange={(event) => {
                  setAccountEmail(event.target.value);
                }}
              ></Form.Control>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group
            as={Col}
            className="form-group"
            controlId="account-re-password"
          >
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Nhập lại mật khẩu"
                onChange={(event) => {
                  setRePassword(event.target.value);
                }}
                required
              ></Form.Control>
              <Form.Control.Feedback>
                Mật khẩu nhập lại không chính xác
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group
            as={Col}
            className="form-group"
            controlId="account-phone-number"
          >
            <Form.Label>Số điện thoại</Form.Label>
            <InputGroup>
              <Form.Control
                type="tel"
                placeholder="012 3456 789"
                pattern="[0-9]{3} [0-9]{4} [0-9]{3}"
                onChange={(event) => setAccountPhoneNumber(event.target.value)}
              ></Form.Control>
              {/* <Form.Control.Feedback>Vui lòng nhập đúng định dạng số điện thoại</Form.Control.Feedback> */}
            </InputGroup>
          </Form.Group>
        </Row>
        <Form.Group>
          <Button type="submit" id="sign-up-button">
            Đăng Ký
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignUpForm;
