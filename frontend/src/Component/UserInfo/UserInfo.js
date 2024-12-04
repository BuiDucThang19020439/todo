import "./UserInfo.css";
import "../../css/icon.css";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

function UserInfo() {
  const token = Cookies.get("id");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.handleLogin.loggedUserInfo);
  if (user.id > 0) console.log(user);
  return (
    <div className="user-info-container">
      <Table striped bordered hover className="user-info-table">
        <thead>
          <tr>
            <td colSpan={2}>Thông tin người dùng</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="user-table-title">Họ và tên</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td className="user-table-title">Thư điện tử</td>
            <td>{user.email}</td>
          </tr>
          <tr className="user-table-title">
            <td>Số điện thoại</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default UserInfo;
