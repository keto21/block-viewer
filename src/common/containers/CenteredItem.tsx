import React from "react";
import { Grid, SxProps } from "@mui/material";

const centeredItem: SxProps = {
  margin: "auto",
};

interface CenteredItemProps {
  centerText?: true | undefined;
  children: React.ReactNode;
  color?: string;
}

const CenteredItem = ({ centerText, children, color }: CenteredItemProps) => {
  return (
    <Grid
      item
      xs={12}
      sx={centeredItem}
      style={{ color: color ?? "inherit" }}
      textAlign={centerText ? "center" : "left"}
    >
      {children}
    </Grid>
  );
};

export default CenteredItem;
