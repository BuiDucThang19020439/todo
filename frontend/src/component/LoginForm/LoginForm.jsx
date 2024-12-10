import "./LoginForm.css";
import "css/icon.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "reducer/toastSlice";
import { userLogin, addUser } from "reducer/loginSlice";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
/**
 * Hàm toggleLoginForm nhận từ Home.js
 */
function LoginForm({ toggleLoginForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userList = useSelector((state) => state.handleLogin.userList);
  // dùng để thêm class cho right panel
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className="background">
      <Button
        type="button"
        className={`button-icon button-icon-close-form close-login-form ${
          isRightPanelActive ? "close-change-color" : ""
        }`}
        onClick={toggleLoginForm}
      >
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
          <Formik
            initialValues={{
              newAccId: "",
              newAccPassword: "",
              rePassword: "",
              newAccName: "",
              newAccEmail: "",
              newAccPhone: "",
            }}
            validationSchema={Yup.object({
              newAccId: Yup.string().required(
                "ID của tài khoản mới không được để trống"
              ),
              newAccPassword: Yup.string().required(
                "Mật khẩu không được để trống"
              ),
              rePassword: Yup.string()
                .required("Hãy nhập lại mật khẩu")
                .oneOf(
                  [Yup.ref("newAccPassword"), null],
                  "Mật khẩu không đúng"
                ),
              newAccName: Yup.string().required(
                "Tên đăng nhập không được để trống"
              ),
              newAccEmail: Yup.string().email("Email không hợp lệ"),
              newAccPhone: Yup.string().matches(
                /^(0|\+84)(\s|\.)?[1-9][0-9]{8}$/,
                "Số điện thoại không hợp lệ"
              ),
            })}
            /**
             * Hàm submit form cho form thêm một tài khoản mới
             */
            onSubmit={(values, { setSubmitting }) => {
              let arrLength = userList.length;
              let newId = arrLength !== 0 ? userList[arrLength - 1].id + 1 : 1;
              dispatch(
                addUser({
                  id: newId,
                  userId: values.newAccId,
                  username: values.newAccName,
                  password: values.newAccPassword,
                  phone: values.newAccPhone,
                  email: values.newAccEmail,
                })
              );
              dispatch(
                showToastMessage({
                  show: true,
                  title: "Đăng Ký thành công",
                  message: "Chào mừng",
                  variant: "success",
                })
              );
              toggleLoginForm();
              setSubmitting(false);
              navigate("/");
            }}
          >
            <Form className="login-form">
              <h2>Tạo tài khoản mới</h2>
              <MyTextInput
                type="text"
                placeholder="ID đăng nhập"
                name="newAccId"
              />
              <MyTextInput
                type="password"
                placeholder="Mật khẩu"
                name="newAccPassword"
              />
              <MyTextInput
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="rePassword"
              />
              <MyTextInput
                type="text"
                placeholder="Tên đăng nhập"
                name="newAccName"
              />
              <MyTextInput
                type="email"
                placeholder="Email"
                name="newAccEmail"
              />
              <MyTextInput
                type="tel"
                placeholder="Số điện thoại"
                name="newAccPhone"
              />
              <button type="submit">Đăng ký</button>
            </Form>
          </Formik>
        </div>

        {/*----------------------------Form đăng nhập---------------------------------------------------------- */}
        <div className="form-container sign-in-container">
          <Formik
            initialValues={{
              accountId: "",
              accountPassword: "",
            }}
            validationSchema={Yup.object({
              accountId: Yup.string().required(
                "ID của tài khoản không được để trống"
              ),
              accountPassword: Yup.string().required(
                "Mật khẩu không được để trống"
              ),
            })}
            /**
             * hàm submit form cho chức năng đăng nhập
             */
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                userLogin({
                  id: values.accountId,
                  password: values.accountPassword,
                })
              );
              dispatch(
                showToastMessage({
                  show: true,
                  title: "Đăng nhập thành công",
                  message: "Chào mừng",
                  variant: "success",
                })
              );
              toggleLoginForm();
              setSubmitting(false);
              navigate("/");
            }}
          >
            <Form className="login-form">
              <h2>Đăng Nhập</h2>
              <MyTextInput
                type="text"
                placeholder="ID đăng nhập"
                name="accountId"
              />
              <MyTextInput
                type="password"
                placeholder="Mật khẩu"
                name="accountPassword"
              />
              <a href="siu">Quên mật khẩu?</a>
              <button type="submit">Đăng nhập</button>
            </Form>
          </Formik>
        </div>

        {/*-----------------------------------------------------overlay---------------------------------------------*/}
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
                Đăng Nhập
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
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

export default LoginForm;
