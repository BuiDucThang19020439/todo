import "./LoginForm.css";
import "../../css/icon.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../../reducer/toastSlice";
import { userLogin, addUser } from "../../reducer/loginSlice";

/**
 * Hàm showLoginForm nhận từ Home.js
 */
function LoginForm({ showLoginForm }) {
  const dispatch = useDispatch();
  // dùng để thêm class cho right panel
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  /**
   * state validate dùng để validate dữ liệu cho form đăng nhập
   */
  const [validatedLogin, setValidateLogin] = useState(false);

  /**
   * state của id đăng nhập và state của mật khẩu đăng nhập
   */
  const [accountId, setAccountId] = useState("");
  const [accountPassword, setAccountPassword] = useState("");

  // state dùng để validate form đăng ký
  const [validateSignUp, setValidateSignUp] = useState(false);
  /**
   * state dùng cho việc đăng kí tài khoản mới
   */
  const [newAccId, setNewAccId] = useState("");
  const [newAccPassword, setNewAccPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [newAccName, setNewAccName] = useState("");
  const [newAccEmail, setNewAccEmail] = useState("");
  const [newAccPhone, setNewAccPhone] = useState("");

  /**
   * hàm xử lý việc gửi thông tin từ form đăng nhập
   */
  const handleSubmitLoginForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidateLogin(true);
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

  let userList = useSelector((state) => state.handleLogin.userList);
  // hàm xử lý submit form đăng ký tài khoản mới
  const handleSignUpForm = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidateSignUp(true);
      let arrLength = userList.length;
      let newId = arrLength !== 0 ? userList[arrLength - 1].id + 1 : 1;
      dispatch(
        addUser({
          id: newId,
          userId: newAccId,
          username: newAccName,
          password: newAccPassword,
          phone: newAccPhone,
          email: newAccEmail,
        })
      );
      showLoginForm();
    }
  };

  return (
    <div className="background">
      <Button
        type="button"
        className={`button-icon button-icon-close-form close-login-form ${
          isRightPanelActive ? "close-change-color" : ""
        }`}
        onClick={showLoginForm}
      >
        {" "}
        <ion-icon name="close-sharp" size="large"></ion-icon>
      </Button>
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {/*-------------------------------form đăng ký--------------------------------------------------------------------- */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpForm}>
            <h2>Tạo tài khoản mới</h2>
            <input
              type="text"
              placeholder="ID đăng nhập"
              onChange={(event) => {
                setNewAccId(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(event) => {
                setNewAccPassword(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              onChange={(event) => {
                setRePassword(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              onChange={(event) => {
                setNewAccName(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setNewAccEmail(event.target.value);
              }}
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              onChange={(event) => setNewAccPhone(event.target.value)}
            />

            <button>Đăng ký</button>
          </form>
        </div>

        {/*----------------------------Form đăng nhập------------------------------------------------------------------ */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmitLoginForm}>
            <h2>Đăng Nhập</h2>
            <input
              type="text"
              placeholder="ID đăng nhập"
              onChange={(event) => {
                setAccountId(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(event) => {
                setAccountPassword(event.target.value);
              }}
            />
            <a href="#">Quên mật khẩu?</a>
            <button type="submit">Đăng nhập</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
