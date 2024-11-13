import { useState } from "react";
import "../css/Header.css";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../reducer/loginSlice";

export default function Header({ showLoginForm, showSignUpForm }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.handleLogin.loggedUserInfo)

  /**
   * Hàm handleLogout xử lý việc đăng xuất tài khoản,
   * nó sẽ gọi userLogout trong loginSlice đồng thời set isLogged thành false
   */
  const handleLogout = () => {
    dispatch(userLogout(user.id));
  };

  return (
    <div className="header">
      {user.loginStatus === false && (
        <div className="button-list">
          <Button onClick={showLoginForm}>Đăng Nhập</Button>
          <Button onClick={showSignUpForm}>Đăng Ký</Button>
        </div>
      )}
      {user.loginStatus === true && (
        <div className="button-list login">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {user.username}
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-action-list">
              <Dropdown.Item
                as="button"
                className="user-action"
                onClick={handleLogout}
              >
                Đăng Xuất
              </Dropdown.Item>
              <Dropdown.Item as="button" className="user-action">
                Thông tin
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
