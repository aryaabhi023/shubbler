import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload !== undefined) {
        state.status = true;
        state.userData = action.payload;
      }
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
    storeUpdateAvatar: (state, action) => {
      state.userData.avatar = action.payload;
    }
  },
});

export const { login, logout,storeUpdateAvatar } = authSlice.actions;
export default authSlice.reducer;
