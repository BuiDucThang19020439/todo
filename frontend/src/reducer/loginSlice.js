import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedUserInfo: {
      id: -1,
      username: "",
      loginStatus: false,
    },
    userList: [
      {
        id: 1,
        userId: "r1ad",
        username: "root",
        password: "admin",
        phone: "0301234567",
        email: "admin@gmail.com",
      },
      {
        id: 2,
        userId: "vanhai02",
        username: "van hai",
        password: "vh02",
        phone: "",
        email: "vanhai@gmail.com",
      },
      {
        id: 3,
        userId: "hoangoc03",
        username: "ngoc hoa",
        password: "nh03",
        phone: "0300333335",
        email: "",
      },
    ],
  },
  reducers: {
    //reducer dùng cho đăng nhập, payload là id mà mật khẩu
    userLogin: (state, action) => {
      const { id, password } = action.payload;
      const user = state.userList.find(
        (user) => user.userId === id && user.password === password
      );
      if (user) {
        state.loggedUserInfo = {
          id: user.id,
          username: user.username,
          loginStatus: true,
        };
        localStorage.setItem("userInfo", JSON.stringify(state.loggedUserInfo));
        Cookies.set("id", user.id, { expires: 2 });
      }
    },
    // payload ở đây là object chứa id
    userLogout: (state) => {
      state.loggedUserInfo = {
        id: -1,
        username: "",
        loginStatus: false,
      };
      localStorage.setItem("userInfo", JSON.stringify({loginStatus: false}));
      Cookies.remove('id');
    },
    // Thêm một người dùng mới
    addUser: (state, action) => {
      state.userList = [...state.userList, action.payload]
    },
  },
});

export default loginSlice;
export const { userLogin, userLogout, addUser } = loginSlice.actions;
