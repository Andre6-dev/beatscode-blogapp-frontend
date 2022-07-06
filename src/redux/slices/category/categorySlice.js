import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

// CREATE CATEGORY ACTION
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // GET USER TOKEN
    const user = getState()?.users;
    const { userAuth } = user;
    try {
      // HTTP CALL
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// FETCH CATEGORIES ACTION
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
    // GET USER TOKEN
    const user = getState()?.users;
    const { userAuth } = user;
    try {
      // HTTP CALL
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      const { data } = await axios.get(`${baseUrl}/api/category`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// SLICES

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    /*CREATE CATEGORY REDUCER*/
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    /*FETCH CATEGORIES REDUCER*/
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.category = false;
      state.appError = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default categorySlices.reducer;
