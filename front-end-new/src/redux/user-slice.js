import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken(state, action) {
      state.user.token = action.payload
    }, 
    setSearchParams(state, action) {
      state.user.searchParams = {
        ...state?.user.searchParams,
        ...action.payload
      };
    },
    setAddress(state, action) {
      state.user.mapAddress = {
        ...state?.user.mapAddress,
        ...action.payload
      };
    }, 
    setReport(state, action) {
      state.user.reportType = action.payload
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
  setSearchParams,
  setAddress,
  setReport
} = userSlice.actions;
export const selectUser = (state) => state.user;



export default userSlice.reducer;