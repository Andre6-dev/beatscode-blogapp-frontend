import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "../slices/users/usersSlices";

const store = configureStore({
  reducer: {
    users: usersReducers,
  },
});

export default store;
