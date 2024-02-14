import { configureStore } from "@reduxjs/toolkit";
import DataReducers from "../features/Datas/DataSlice";
import DeleteReducer from "../features/Datas/DeleteSlice";

const stores = configureStore({
  reducer: {
    datasReducers: DataReducers,
    deleteReducer: DeleteReducer,
  },
});

export default stores;
