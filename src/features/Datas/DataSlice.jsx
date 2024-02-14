import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// const preloadedState = localStorage.getItem('reduxState')
//   ? JSON.parse(localStorage.getItem('reduxState'))
//   : {};

const initialState = {
  datas: [],
  isLoading: false,
  error: null,
};




export const FetchData = createAsyncThunk("datas/fetchdatas", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (postData) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    postData
  );
  return response.data;
});
export const updatedData = createAsyncThunk(
  "puts/PutUpdate",
  async ({ id, title, body, userId }) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {title, body, userId}
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteData = createAsyncThunk("datas/deleteData", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const DataSlice = createSlice({
  name: "datas",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(FetchData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.datas = action.payload.slice(0, 50);
      state.error = null;
    });
    builder.addCase(FetchData.rejected, (state, action) => {
      state.isLoading = false;
      state.datas = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.datas = state.datas.filter((data) => data.id !== action.payload);
      state.error = null;
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.datas.push(action.payload);
    });
    builder.addCase(updatedData.fulfilled, (state, action) => {
      if (action.payload) {
        const { id, title, userId, body } = action.payload;
        const isDataExist = state.datas.find((data) => data.id === id);
        if (isDataExist) {
          isDataExist.title = title;
          isDataExist.body = body;
          isDataExist.userId = userId;
        }
      }
    });
  },
});

export const { AddData } = DataSlice.actions;

export default DataSlice.reducer;
