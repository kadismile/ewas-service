import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
