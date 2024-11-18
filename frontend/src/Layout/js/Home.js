import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "../css/Home.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import ToastMsg from "../../Component/Toast/ToastMsg";
import LoginForm from "../../Component/LoginForm/LoginForm";
import TodoList from "../../TodoList/TodoList";
import TodoForm from "../../Component/TodoForm/TodoForm";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { userLogin } from "../../reducer/loginSlice";
import axios from 'axios'; 
function Home() {
  let fetchData = async()=> {
    let response = await axios.get('http://localhost:3001/taskList');
    let final = await response.data;
    console.log(final);  
  }
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

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.handleLogin.userList);
  const initLogin = async() => {
    const token = Cookies.get("id");
    if(token) {
      const u = userList.filter((user) => {
        return user.id == token;
      });
      await dispatch(userLogin({
        id: u[0].userId,
        password: u[0].password,
      }));
    }
  }

  useEffect(() => {
    fetchData();
    initLogin();
  },[]);

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
        </Routes>
      </div>
      <ToastMsg></ToastMsg>
      {isLoginForm && <LoginForm toggleLoginForm={toggleLoginForm}></LoginForm>}
      {isAddTodoItem && (<TodoForm toggleAddItemForm={toggleAddItemForm}></TodoForm>)}
    </div>
  );
}

export default Home;
