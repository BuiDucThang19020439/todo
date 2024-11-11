import { useState } from "react";
import "../css/Header.css";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';

import { useDispatch } from "react-redux";
import { userLogout } from "../../reducer/loginSlice";

export default function Header({ showLoginForm, showSignUpForm }) {
  const dispatch = useDispatch();
  // lấy trạng thái đăng nhập lưu trên localStorage
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem("loginStatus")) || false);
  // lấy userName của người dùng nếu đã đăng nhập
  let userName = "";
  if (isLogged === true) {
    userName = JSON.parse(localStorage.getItem("userInfo")).username;
  }

  /**
   * Hàm handleLogout xử lý việc đăng xuất tài khoản, 
   * nó sẽ gọi userLogout trong loginSlice đồng thời set isLogged thành false
   */
  const handleLogout = (event) => {
    event.stopPropagation();
    dispatch(userLogout());
    setIsLogged(false);
  };
  
  return (
    <div className="header">
      {!isLogged && (
        <div className="button-list">
          <Button onClick={showLoginForm}>Đăng Nhập</Button>
          <Button onClick={showSignUpForm}>Đăng Ký</Button>
        </div>
      )}
      {isLogged && (
        <div className="button-list login">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {userName}
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-action-list">
              <Dropdown.Item as='button' className="user-action" onClick={handleLogout}>Đăng Xuất</Dropdown.Item>
              <Dropdown.Item as='button' className="user-action">Thông tin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
