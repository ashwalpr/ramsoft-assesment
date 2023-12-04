import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
  {
    id: 23,
    project_name: "My App",
    submission_date: "12/2/2023",
    summary: "My Summary",
    attachment: "",
    description: "jksdkkdnkjnd",
    status: "inProgress",
    isFavourite: false,
  },
  {
    id: 78,
    project_name: "My Apdfcwefp",
    submission_date: "12/2/2023",
    summary: "My Summary",
    attachment: "",
    description: "jksdkkdnkjnd",
    status: "inProgress",
    isFavourite: false,
  },
  {
    id: 567,
    project_name: "My Apsfbdfgbp",
    submission_date: "12/2/2023",
    summary: "My Summary",
    attachment: "",
    description: "jksdkkdnkjnd",
    status: "inProgress",
    isFavourite: false,
  },
  {
    id: 453,
    project_name: "Mjfnwejfy App",
    submission_date: "12/2/2023",
    summary: "My Summary",
    attachment: "",
    description: "jksdkkdnkjnd",
    status: "inProgress",
    isFavourite: false,
  },
  {
    id: 45,
    project_name: "Mkjsdkjfy App",
    submission_date: "12/2/2023",
    summary: "My Summary",
    attachment: "",
    description: "jksdkkdnkjnd",
    status: "inProgress",
    isFavourite: false,
  },
  {
    id: 56,
    project_name: "My App",
    submission_date: "12/2/2023",
    summary: "My Summary",
    attachment: "",
    description: "jksdkkdnkjnd",
    status: "inProgress",
    isFavourite: false,
  },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: { value: initialState },
  reducers: {
    addTask: (state, action) => {
      console.log("dsjc", action);
      state.value.push({ id: nanoid(), ...action.payload });
    },
    updateTask: (state, action) => {
      let updatedTasks = state.value.map((data) =>
        data.id == action.payload.id ? action.payload : data
      );
      //   console.log("djcjd", action);
      state.value = updatedTasks;
      //   state.length = 0;
      console.log("wdf", state);
    },
    deleteTask: (state, action) => {
      console.log("action", action);
      let filteredData = state.value.filter(
        (data) => data.id != action.payload
      );
      state.value = filteredData;
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
