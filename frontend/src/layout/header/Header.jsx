import "./Header.css";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "reducer/loginSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ toggleLoginForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  /**
   * Hàm handleLogout xử lý việc đăng xuất tài khoản,
   * nó sẽ gọi userLogout trong loginSlice đồng thời set isLogged thành false
   */
  const handleLogout = () => {
    dispatch(userLogout(token));
    navigate("/");
  };

  return (
    <div className="header">
      {!!token === false && (
        <div className="button-list">
          <Button onClick={toggleLoginForm}>Đăng Nhập / Đăng Ký</Button>
        </div>
      )}
      {!!token === true && (
        <div className="button-list login">
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {JSON.parse(localStorage.getItem("currentUser")).userName}
            </Dropdown.Toggle>
            <Dropdown.Menu className="user-action-list">
              <Dropdown.Item
                as="button"
                className="user-action"
                onClick={handleLogout}
              >
                Đăng Xuất
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className="user-action"
                onClick={() => navigate("/userInfo")}
              >
                Thông tin
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
