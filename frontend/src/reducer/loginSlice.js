import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { showToastMessage } from "./toastSlice";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
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
    userLogin: (state, action) => {
      let arrLength = state.userList.length;
      for (let i = 0; i < arrLength; i++) {
        if (
          action.payload.id === state.userList[i].userId &&
          action.payload.password === state.userList[i].password
        ) {
          localStorage.setItem("loginStatus", true);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...state.userList[i],
            })
          );
          return;
        }
      }
    },
    userLogout: () => {
      localStorage.setItem("loginStatus", false);
      localStorage.removeItem("userInfo");
    },
  },
});

export default loginSlice;
export const { userLogin, userLogout } = loginSlice.actions;
