import { createSlice } from "@reduxjs/toolkit";

interface Users {}

interface SharedSliceState {
  usersData: Users;
}

interface sharedSliceInterface {
  sharedSlice: SharedSliceState;
}

const initialState = {
  usersData: {},
};

const sharedSlice = createSlice({
  name: "sharedSlice",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.usersData = action.payload;
    },
  },
});

export const { updateUser } = sharedSlice.actions;

export const getUsersData = (state: sharedSliceInterface) =>
  state.sharedSlice.usersData;

export default sharedSlice.reducer;
