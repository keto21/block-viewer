import { configureStore } from "@reduxjs/toolkit";
import { createTestStore } from "../../utils/testUtils";
import fileDataReducer, {
  FileDataState,
  setBlockCount,
  setBlockSize,
  setCurrentBlockNumber,
  initData,
  updateCurrentBlock,
  setName,
  selectActiveIndex,
  setActiveIndex,
} from "./fileDataReducer";

const mockStore = createTestStore;

describe("fileData reducer", () => {
  const initialState: FileDataState = {
    blockSize: 0,
    blockCount: 0,
    currentBlockNumber: 0,
    name: "",
    size: 0,
    activeIndex: -1,
  };

  it("should handle set block size", () => {
    const actual = fileDataReducer(initialState, setBlockSize(2));
    expect(actual.blockSize).toEqual(2);
  });

  it("should handle set block count", () => {
    const actual = fileDataReducer(initialState, setBlockCount(6));
    expect(actual.blockCount).toEqual(6);
  });

  it("should handle set block number", () => {
    const actual = fileDataReducer(initialState, setCurrentBlockNumber(20));
    expect(actual.currentBlockNumber).toEqual(0);
  });

  it("should handle set active index", () => {
    const actual = fileDataReducer(initialState, setActiveIndex(5));
    expect(actual.activeIndex).toEqual(5);
  });

  it("should handle set block number with set block count", () => {
    const newState = fileDataReducer(initialState, setBlockCount(6));
    expect(newState.blockCount).toEqual(6);

    const lastBlockState = fileDataReducer(newState, setCurrentBlockNumber(20));
    expect(lastBlockState.currentBlockNumber).toEqual(20);

    const fourthBlockState = fileDataReducer(
      lastBlockState,
      setCurrentBlockNumber(3)
    );
    expect(fourthBlockState.currentBlockNumber).toEqual(3);
  });

  it("should handle init data and switch current block", () => {
    const store = mockStore();

    store.dispatch(setBlockSize(4));
    store.dispatch(setName("file.txt"));
    store.dispatch(
      initData(new Uint8Array([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]))
    );

    const fileDataState = store.getState().fileData;
    expect(fileDataState.name).toEqual("file.txt");
    expect(fileDataState.size).toEqual(16);
    expect(fileDataState.blockSize).toEqual(4);
    expect(fileDataState.blockCount).toEqual(4);
    expect(fileDataState.currentBlockNumber).toEqual(0);

    store.dispatch(updateCurrentBlock(1));
    const fileDataStateAfterFirstChange = store.getState().fileData;
    expect(fileDataStateAfterFirstChange.currentBlockNumber).toEqual(1);

    store.dispatch(updateCurrentBlock(20));
    const fileDataStateAfterSecondChange = store.getState().fileData;
    expect(fileDataStateAfterSecondChange.currentBlockNumber).toEqual(3);
  });
});
