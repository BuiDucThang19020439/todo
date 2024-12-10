import { configureStore } from "@reduxjs/toolkit";
import { toastSlice } from "./toastSlice";
import { loginSlice } from "./loginSlice";

export default configureStore({
  reducer: {
    handleToastMessage: toastSlice.reducer,
    handleLogin: loginSlice.reducer,
  },
});
