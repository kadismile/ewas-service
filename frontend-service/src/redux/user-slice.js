import { createSlice } from "@reduxjs/toolkit";
import appStorage from '@/redux/customStorage'

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      appStorage.setItem('user', action.payload)
    },
    setToken(state, action) {
      state.user.token = action.payload
    }, 
    setAddress(state, action) {
      state.user.address = action.payload
    }, 
    setReport(state, action) {
      state.user.reportType = action.payload
      const data = { reportOption: action.payload }
      appStorage.setItem('user', data)
    }, 
    clearToken: (state) => {
      state = null;
      return state;
    },
    resetUser(state) {
      state.user = undefined;
      localStorage.setItem('persist:root', '')
    },
  },
});


export const { 
  resetUser, 
  clearToken, 
  setUser, 
  setToken,
  setAddress,
  setReport
} = userSlice.actions;

export default userSlice.reducer;