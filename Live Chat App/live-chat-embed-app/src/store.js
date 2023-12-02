import { configureStore } from "@reduxjs/toolkit";

import { visitorIdReducer } from "./visitorSlice";
export const store = configureStore({
  reducer: {
    visitor: visitorIdReducer,
  },
});

export default store;
