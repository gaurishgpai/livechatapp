import { configureStore } from "@reduxjs/toolkit";
import { numReducer } from "./counterSlice";
import { visitorIdReducer } from "./visitorSlice";
export const store = configureStore({
  reducer: {
    count: numReducer,
    visitor: visitorIdReducer,
  },
});

export default store;
