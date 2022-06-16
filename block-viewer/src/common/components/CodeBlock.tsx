import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectActiveIndex } from "../../state/fileData/fileDataReducer";
import { BaseOrAscii } from "../../utils/types";
import { convertToBaseOrAscii } from "../../utils/utils";
import CodeSpan from "./CodeSpan";

interface CodeBlockProps {
  baseOrAscii?: BaseOrAscii;
  blockData: number[];
}

const CodeBlock = ({ baseOrAscii = 10, blockData }: CodeBlockProps) => {
  const activeIndex = useSelector(selectActiveIndex);

  return (
    <Grid item xs={12} textAlign={"left"}>
      <code style={{ whiteSpace: "pre-wrap" }}>
        {blockData.map((value: number, idx: number) => (
          <CodeSpan
            value={convertToBaseOrAscii(
              value,
              baseOrAscii,
              baseOrAscii === "ascii" ? 0 : 2,
              3
            )}
            idx={idx}
            activeIndex={activeIndex}
          />
        ))}
      </code>
    </Grid>
  );
};

export default CodeBlock;
