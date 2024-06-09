import { configureStore, combineReducers } from "@reduxjs/toolkit";
import balanceReducer from "./balanceSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  balance: balanceReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
