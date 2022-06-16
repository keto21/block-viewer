import { configureStore } from "@reduxjs/toolkit";
import fileDataReducer from "../state/fileData/fileDataReducer";

export const createTestStore = () => {
  const store = configureStore({
    reducer: {
      fileData: fileDataReducer,
    },
  });

  return store;
};
