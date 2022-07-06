import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";

const store = configureStore({
  reducer: {
    users: usersReducers,
    category: categoriesReducer,
  },
});

export default store;
