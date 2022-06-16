import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectBlockSize,
  selectCurrentBlockNumber,
} from "../../state/fileData/fileDataReducer";
import CodeBlock from "./CodeBlock";

interface OutputAreaProps {
  readerData: Uint8Array | null;
}

const OutputArea = ({ readerData }: OutputAreaProps) => {
  const currentBlockNumber = useSelector(selectCurrentBlockNumber);
  const blockSize = useSelector(selectBlockSize);

  const [blockData, setBlockData] = useState<number[]>([]);

  useEffect(() => {
    if (!readerData) return;
    setBlockData(
      Array.from(getBlockData(currentBlockNumber, blockSize, readerData))
    );
  }, [currentBlockNumber, blockSize, readerData]);

  return (
    <Grid container paddingTop={"1em"}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} paddingLeft={3} paddingRight={2}>
          <Grid item xs={6}>
            <CodeBlock baseOrAscii={16} blockData={blockData} />
          </Grid>
          <Grid item xs={6}>
            <CodeBlock baseOrAscii={"ascii"} blockData={blockData} />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

const getBlockData = (
  blockNumber: number,
  blockSize: number,
  readerData: Uint8Array | null
): Uint8Array => {
  if (readerData === null) return new Uint8Array([]);

  const dataSliceStart = blockNumber * blockSize;
  const dataSliceEnd = dataSliceStart + blockSize;

  return readerData.slice(dataSliceStart, dataSliceEnd);
};

export default OutputArea;
