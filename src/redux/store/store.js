import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "../slices/users/usersSlices";
import categoriesReducer from "../slices/category/categorySlice";
import post from "../slices/posts/postSlices";

const store = configureStore({
  reducer: {
    users: usersReducers,
    category: categoriesReducer,
    post,
  },
});

export default store;
