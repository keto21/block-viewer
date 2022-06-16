import React from "react";
import { Grid, GridDirection, GridSpacing, SxProps } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";

const centeredGrid: SxProps = {
  width: "100%",
  display: "flex",
};

interface CenteredGridProps {
  spacing?: ResponsiveStyleValue<GridSpacing>;
  direction?: ResponsiveStyleValue<GridDirection>;
  alignItems?: ResponsiveStyleValue<"center" | "flex-start" | "flex-end">;

  children: React.ReactNode;
}

const CenteredGrid = ({
  spacing,
  direction,
  alignItems,
  children,
}: CenteredGridProps) => {
  return (
    <Grid
      container
      sx={centeredGrid}
      spacing={spacing ?? 2}
      direction={direction ?? "column"}
      alignItems={alignItems ?? "center"}
      alignContent="center"
      xs={12}
    >
      {children}
    </Grid>
  );
};

export default CenteredGrid;
