import { useState } from "react";
import { Routes, Route } from "react-router";
import "../css/Home.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ToastMsg from "../../Component/Toast/ToastMsg";
import Footer from "./Footer";
import LoginForm from "../../Component/LoginForm/LoginForm";
import SignUpForm from "../../Component/SignUpForm/SignUpForm";
import TodoList from "../../TodoList/TodoList";
import TodoForm from "../../Component/TodoForm/TodoForm";

function Home() {
  /**
   * isLoginForm dùng để ẩn hiện trang đăng nhập
   * hàm showLoginForm dùng để đổi trạng thái true-false của isLoginForm
   */
  const [isLoginForm, setIsLoginForm] = useState(false);
  function showLoginForm() {
    setIsLoginForm(!isLoginForm);
  }

  /**
   * isSignUpForm dùng để ẩn hiện trang đăng ký
   * hàm showSignUpForm dùng để thay đổi trạng thái của isSignUpForm
   */
  const [isSignUpForm, setSignUpForm] = useState(false);
  function showSignUpForm() {
    setSignUpForm(!isSignUpForm);
  }

  /**
   * isAddTodoItem dùng để ẩn hiện trang thêm việc tại trang todo list
   */
  const [isAddTodoItem, setIsAddTodoItem] = useState(false);
  function showAddTodoItem() {
    setIsAddTodoItem(!isAddTodoItem);
  }

  return (
    <div className="home">
      <div className="left-sidebar">
        <Sidebar></Sidebar>
      </div>
      <div className="content">
        <Header
          showLoginForm={showLoginForm}
          showSignUpForm={showSignUpForm}
        ></Header>

        <Routes>
          <Route path="/" element={<MainContent></MainContent>} />
          <Route
            path="/TodoList"
            element={
              <TodoList
                showAddTodoItem={showAddTodoItem}
              ></TodoList>
            }
          />
        </Routes>
        {/* <Footer></Footer> */}
      </div>
      <ToastMsg></ToastMsg>

      {isLoginForm && <LoginForm showLoginForm={showLoginForm}></LoginForm>}
      {isSignUpForm && (
        <SignUpForm showSignUpForm={showSignUpForm}></SignUpForm>
      )}
      {isAddTodoItem && (
        <TodoForm
          showAddTodoItem={showAddTodoItem}
        ></TodoForm>
      )}
    </div>
  );
}

export default Home;
