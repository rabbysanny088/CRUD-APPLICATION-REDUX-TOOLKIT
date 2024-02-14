import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deletingStates: {},
};

const DeleteSlice = createSlice({
  name: "delete",
  initialState: initialState,
  reducers: {
    setDeletingState(state, action) {
      const { id, loading } = action.payload;
      state.deletingStates[id] = loading;
    },
  },
});

export const {setDeletingState} = DeleteSlice.actions;
export default DeleteSlice.reducer;