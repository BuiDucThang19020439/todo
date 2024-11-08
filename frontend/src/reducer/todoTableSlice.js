import { createSlice } from "@reduxjs/toolkit";

export const todoTableSlice = createSlice({
  name: "todoTableData",
  initialState: {
    taskList: [
      {
        id: 1,
        userId: 1,
        title: "Việc nhà",
        content: "Giặt đồ",
        deadline: "2024-12-30",
        important: "Không quan trọng",
        completed: false,
      },
      {
        id: 2,
        userId: 1,
        title: "Việc nhà",
        content: "Phơi đồ",
        deadline: "2024-12-30",
        important: "Không quan trọng",
        completed: false,
      },
      {
        id: 3,
        userId: 2,
        title: "Công việc",
        content: "Viết API",
        deadline: "2024-12-30",
        important: "Rất quan trọng",
        completed: false,
      },
      {
        id: 4,
        userId: 3,
        title: "Công việc",
        content: "Validate form",
        deadline: "2024-12-30",
        important: "Quan trọng",
        completed: false,
      },
    ],
  },
  reducers: {
    getTodoData: (state) => {
      console.log(state.taskList);
    },
    // Checkbox về sự hoàn thành của nhiệm vụ
    toggleComplete: (state, action) => {
      // hàm findIndex trả về phần tử đầu tiên thỏa mãn điều kiện
      const index = state.taskList.findIndex((task) => task.id === action.payload.id);
      state.taskList[index].completed = action.payload.completed;
    },
    // Thêm 1 phần tử vào danh sách
    addTodoItem: (state, action) => {
      state.taskList = [...state.taskList, action.payload];
    },
    //delTodoItem nhận payload là id để xóa phần tử có id đó trong mảng
    delTodoItem: (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export default todoTableSlice;
export const { getTodoData, toggleComplete, addTodoItem, delTodoItem } = todoTableSlice.actions;
