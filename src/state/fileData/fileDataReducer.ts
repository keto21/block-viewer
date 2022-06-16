import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import { RootState, AppThunk } from "../store";

const DEFAULT_BLOCK_SIZE = 512;

export interface FileDataState {
  name: string;
  size: number;
  blockSize: number;
  blockCount: number; // number of blocks based on blockSize
  currentBlockNumber: number;
  activeIndex: number;
}

const initialState: FileDataState = {
  name: "",
  size: 0,
  blockSize: DEFAULT_BLOCK_SIZE,
  blockCount: 0,
  currentBlockNumber: 0,
  activeIndex: -1,
};

export const fileDataSlice = createSlice({
  name: "fileData",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    setBlockSize: (state, action: PayloadAction<number>) => {
      state.blockSize = action.payload;
    },
    setBlockCount: (state, action: PayloadAction<number>) => {
      state.blockCount = action.payload;
    },
    setCurrentBlockNumber: (state, action: PayloadAction<number>) => {
      state.currentBlockNumber = action.payload;
    },
    setActiveIndex: (state, action: PayloadAction<number>) => {
      state.activeIndex = action.payload;
    },
  },
});

export const {
  setName,
  setSize,
  setBlockSize,
  setBlockCount,
  setCurrentBlockNumber,
  setActiveIndex,
} = fileDataSlice.actions;

export const selectName = (state: RootState) => state.fileData.name;
export const selectSize = (state: RootState) => state.fileData.size;
export const selectBlockSize = (state: RootState) => state.fileData.blockSize;
export const selectBlockCount = (state: RootState) => state.fileData.blockCount;
export const selectCurrentBlockNumber = (state: RootState) =>
  state.fileData.currentBlockNumber;
export const selectActiveIndex = (state: RootState) =>
  state.fileData.activeIndex;

export const initData =
  (fileData: Uint8Array): AppThunk =>
  (dispatch, getState) => {
    const blockSize = selectBlockSize(getState());
    const blockCount = Math.ceil(fileData.length / blockSize);

    batch(() => {
      dispatch(setSize(fileData.length));
      dispatch(setBlockCount(blockCount));
      dispatch(setCurrentBlockNumber(0));
    });
  };

export const updateCurrentBlock =
  (blockNumber: number): AppThunk =>
  (dispatch, getState) => {
    const blockCount = selectBlockCount(getState());
    if (blockCount === 0 && blockNumber > blockCount) return;

    const newBlockNumber = blockNumber;
    const maxBlockNumber = blockCount - 1;

    const currentBlockNumber = Math.max(
      0,
      Math.min(newBlockNumber, maxBlockNumber)
    );

    batch(() => {
      dispatch(setCurrentBlockNumber(currentBlockNumber));
    });
  };

export default fileDataSlice.reducer;
