import { configureStore } from '@reduxjs/toolkit';
import {toastSlice } from './toastSlice';
import {todoTableSlice} from './todoTableSlice';

export default configureStore({
  reducer: {
    handleToastMessage: toastSlice.reducer,
    handleTodoTable: todoTableSlice.reducer,
  }
})