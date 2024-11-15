import { useState } from "react";
import { Routes, Route } from "react-router";
import "../css/Home.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ToastMsg from "../../Component/Toast/ToastMsg";
import LoginForm from "../../Component/LoginForm/LoginForm";
import TodoList from "../../TodoList/TodoList";
import TodoForm from "../../Component/TodoForm/TodoForm";

function Home() {
  /**
   * isLoginForm dùng để ẩn hiện trang đăng nhập
   * hàm toggleLoginForm dùng để đổi trạng thái true-false của isLoginForm
   */
  const [isLoginForm, setIsLoginForm] = useState(false);
  function toggleLoginForm() {
    setIsLoginForm(!isLoginForm);
  }

  /**
   * isAddTodoItem dùng để ẩn hiện trang thêm việc tại trang todo list
   */
  const [isAddTodoItem, setIsAddTodoItem] = useState(false);
  function toggleAddItemForm() {
    setIsAddTodoItem(!isAddTodoItem);
  }

  return (
    <div className="home">
      <div className="left-sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="content">
        <Header
          toggleLoginForm={toggleLoginForm}
        ></Header>

        <Routes>
          <Route path="/" element={<MainContent></MainContent>} />
          <Route
            path="/TodoList"
            element={
              <TodoList
                toggleAddItemForm={toggleAddItemForm}
              ></TodoList>
            }
          />
        </Routes>
      </div>
      <ToastMsg></ToastMsg>

      {isLoginForm && <LoginForm toggleLoginForm={toggleLoginForm}></LoginForm>}
      {isAddTodoItem && (
        <TodoForm
          toggleAddItemForm={toggleAddItemForm}
        ></TodoForm>
      )}
    </div>
  );
}

export default Home;
