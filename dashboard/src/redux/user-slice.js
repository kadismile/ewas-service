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


export const { resetUser, clearToken, setUser, setToken } = userSlice.actions;
export const selectUser = (state) => state.user;



export default userSlice.reducer;