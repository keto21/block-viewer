import React from "react";
import { useSelector } from "react-redux";
import {
  selectBlockCount,
  selectSize,
  selectName,
} from "../../state/fileData/fileDataReducer";
import CenteredGrid from "../containers/CenteredGrid";
import CenteredItem from "../containers/CenteredItem";
import FileInfoBox from "./FileInfoBox";

const FileInfo = () => {
  const name = useSelector(selectName);
  const size = useSelector(selectSize);
  const blockCount = useSelector(selectBlockCount);

  return (
    <CenteredGrid alignItems={"center"} spacing={0} direction={"column"}>
      <code>
        <CenteredItem>
          <h2 style={{ textAlign: "center" }}>File Information</h2>
        </CenteredItem>
        <FileInfoBox primary={"name"} secondary={name} />
        <FileInfoBox primary={"file size"} secondary={size + " bytes"} />
        <FileInfoBox primary={"number of blocks"} secondary={blockCount} />
      </code>
    </CenteredGrid>
  );
};

export default FileInfo;
