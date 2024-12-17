import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./Home.css";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import MainContent from "../mainContent/MainContent";
import ToastMsg from "component/toast/ToastMsg";
import LoginForm from "component/LoginForm/LoginForm";
import TodoList from "pages/todoList/TodoList";
import TodoForm from "component/TodoForm/TodoForm";
import UserInfo from "pages/userInfo/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { userLogin } from "reducer/loginSlice";
import axios from "axios";

function Home() {
  /**
   * isLoginForm dùng để ẩn hiện trang đăng nhập
   * hàm toggleLoginForm dùng để đổi trạng thái true-false của isLoginForm
   */
  const [isLoginForm, setIsLoginForm] = useState(false);
  function toggleLoginForm() {
    setIsLoginForm((prev) => !prev);
  }

  /**
   * isAddTodoItem dùng để ẩn hiện trang thêm việc tại trang todo list
   */
  const [isAddTodoItem, setIsAddTodoItem] = useState(false);
  function toggleAddItemForm() {
    setIsAddTodoItem((prev) => !prev);
  }

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.handleLogin.userList);

  // hàm initLogin có nhiệm vụ đăng nhập lại nếu người dùng chưa đăng xuất mà refresh hoặc xóa trình duyệt
  const initLogin = () => {
    const token = Cookies.get("id");
    if (token) {
      const u = userList.filter((user) => {
        return user.id == token;
      });
      dispatch(
        userLogin({
          id: u[0].userId,
          password: u[0].password,
        })
      );
    }
  };
  // tự động đăng nhập nếu vẫn còn token lưu trên cockies
  useEffect(() => {
    initLogin();
  }, []);

  return (
    <div className="home">
      <div className="left-sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="content">
        <Header toggleLoginForm={toggleLoginForm}></Header>
        <Routes>
          <Route path="/" element={<MainContent></MainContent>} />
          <Route
            path="/TodoList"
            element={
              <TodoList toggleAddItemForm={toggleAddItemForm}></TodoList>
            }
          />
          <Route path="/userInfo" element={<UserInfo></UserInfo>}></Route>
        </Routes>
      </div>
      <ToastMsg></ToastMsg>
      {/* form đăng nhập và form thêm tài sản lưu ẩn hiện ở đây */}
      {isLoginForm && <LoginForm toggleLoginForm={toggleLoginForm}></LoginForm>}
      {isAddTodoItem && (
        <TodoForm toggleAddItemForm={toggleAddItemForm}></TodoForm>
      )}
    </div>
  );
}

export default Home;
