import { createSlice } from "@reduxjs/toolkit";

export const toastSlice = createSlice({
  name: "toast",
  /**
   * show: hiện toast msg hay ko
   * title: tiêu đề msg
   * message: thông điệp gửi đi
   * variant: loại thông báo
   */
  initialState: {
    show: false,
    title: "",
    message: "",
    variant: "",
  },
  reducers: {
    /**
     * hiện toast msg và gán các trường cho nó
     */
    showToastMessage: (state, actions) => {
      state.show = true;
      state.title = actions.payload.title;
      state.message = actions.payload.message;
      state.variant = actions.payload.variant;
    },
    /**
     * Ẩn toast msg 
     */
    hideToastMessage: (state) => {
      state.show = false;
      state.title = "";
      state.message = "";
      state.variant = "";
    },
  },
});

export const { showToastMessage, hideToastMessage } = toastSlice.actions;
export default toastSlice;
