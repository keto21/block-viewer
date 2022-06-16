import { Button, Grid, TextField } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import {
  selectCurrentBlockNumber,
  updateCurrentBlock,
} from "../../state/fileData/fileDataReducer";

const BlockSelector = () => {
  const dispatch = useAppDispatch();

  const currentBlockNumber = useSelector(selectCurrentBlockNumber);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const blockNumber = +parseInt(event.target.value) || 0;
    dispatch(updateCurrentBlock(blockNumber));
  };

  const incBlockNumber =
    (currentBlockNumber: number, step: number = 1) =>
    () => {
      dispatch(updateCurrentBlock(currentBlockNumber + step));
    };

  return (
    <Grid container alignItems={"center"} justifyContent={"center"} spacing={2}>
      <Grid item>
        <Button
          variant="outlined"
          onClick={incBlockNumber(currentBlockNumber, -1)}
        >
          previous block (-1)
        </Button>
      </Grid>
      <Grid item>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={currentBlockNumber}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={incBlockNumber(currentBlockNumber)}>
          next block (+1)
        </Button>
      </Grid>
    </Grid>
  );
};

export default BlockSelector;
