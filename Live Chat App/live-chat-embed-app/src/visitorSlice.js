import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitorId: "",
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    updateVId: (state, action) => {
      state.visitorId = action.payload;
    },
  },
});

export const { updateVId } = visitorSlice.actions;
export const visitorIdReducer = visitorSlice.reducer;
