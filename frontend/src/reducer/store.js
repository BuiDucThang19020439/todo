import { configureStore } from '@reduxjs/toolkit';
import {toastSlice } from './toastSlice';

export default configureStore({
  reducer: {
    handleToastMessage: toastSlice.reducer,
  }
})