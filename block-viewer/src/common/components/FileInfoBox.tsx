import { Box } from "@mui/material";
import React from "react";
import CenteredItem from "../containers/CenteredItem";

interface FileInfoBoxProps {
  primary: string | number;
  secondary: string | number;
}

const FileInfoBox = ({ primary, secondary }: FileInfoBoxProps) => {
  return (
    <Box sx={{ m: 2 }}>
      <CenteredItem color={"#787878"} centerText>
        {primary}
      </CenteredItem>
      <CenteredItem centerText>{secondary}</CenteredItem>
    </Box>
  );
};

export default FileInfoBox;
