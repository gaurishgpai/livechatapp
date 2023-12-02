import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  num: 0,
  web: 0,
};

const counterSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    chat: (state) => {
      state.num = 2;
    },
    website: (state) => {
      state.num = 1;
    },
    dashboard: (state) => {
      state.num = 0;
    },
  },
});

export const { chat, website, dashboard } = counterSlice.actions;
export const numReducer = counterSlice.reducer;
