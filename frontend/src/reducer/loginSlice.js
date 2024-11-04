import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        status: false,
        username: '',
        password: '',
    },
    
});