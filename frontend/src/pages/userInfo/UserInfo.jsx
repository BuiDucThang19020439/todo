import "./UserInfo.css";
import "css/icon.css";
import { Table, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";
import { useState } from "react";

function UserInfo() {
  const user = useSelector((state) => state.handleLogin.loggedUserInfo);

  const [romaNum, setRomaNum] = useState(1);
  function convertToRoman(num) {
    if (num <= 0 || num >= 10000) return "Số không hợp lệ";
    const romanNumerals = [
      { value: 1000, symbol: "M" },
      { value: 900, symbol: "CM" },
      { value: 500, symbol: "D" },
      { value: 400, symbol: "CD" },
      { value: 100, symbol: "C" },
      { value: 90, symbol: "XC" },
      { value: 50, symbol: "L" },
      { value: 40, symbol: "XL" },
      { value: 10, symbol: "X" },
      { value: 9, symbol: "IX" },
      { value: 5, symbol: "V" },
      { value: 4, symbol: "IV" },
      { value: 1, symbol: "I" },
    ];
    let result = "";
    for (let i = 0; i < romanNumerals.length; i++) {
      while (num >= romanNumerals[i].value) {
        result += romanNumerals[i].symbol;
        num -= romanNumerals[i].value;
    }}
    return result;
  }
  let users = [];
  const renderFakePeople = () => {
    for (let i = 0; i < romaNum; i++) {
      let newPerson = {
        fullName: faker.person.fullName(),
        job: faker.person.jobTitle() + " " + faker.person.jobType(),
      };
      users.push(newPerson);
    }
    console.table(users);
    users = [];
  };

  return (
    <div className="user-info-container">
      <Table striped bordered hover className="user-info-table">
        <thead><tr><td colSpan={2}>Thông tin người dùng</td></tr></thead>
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
        {/* <tfoot className="tr-footer">
          <td colSpan={2}>
            <Form.Control
              className="input-number"
              type="number"
              value={romaNum}
              onChange={(event) => setRomaNum(event.target.value)}
            />
            <Button className="primary-btn" onClick={renderFakePeople}>Nhập</Button>
            <Button className="primary-btn" onClick={() => console.clear()}>Clear Console</Button>
            <h1>{convertToRoman(romaNum)}</h1>
          </td>
        </tfoot> */}
      </Table>

    </div>
  );
}

export default UserInfo;
