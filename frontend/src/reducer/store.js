import { configureStore } from "@reduxjs/toolkit";
import { toastSlice } from "./toastSlice";
import { todoTableSlice } from "./todoTableSlice";
import { loginSlice } from "./loginSlice";

export default configureStore({
  reducer: {
    handleToastMessage: toastSlice.reducer,
    handleTodoTable: todoTableSlice.reducer,
    handleLogin: loginSlice.reducer,
  },
});
