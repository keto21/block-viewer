import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import fileDataReducer from "./fileData/fileDataReducer";

export const store = configureStore({
  reducer: {
    fileData: fileDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
