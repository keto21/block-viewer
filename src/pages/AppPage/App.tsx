import React from "react";
import FileSelection from "../../common/components/FileSelection";
import { useSelector } from "react-redux";
import { selectBlockSize } from "../../state/fileData/fileDataReducer";
import CenteredGrid from "../../common/containers/CenteredGrid";
import CenteredItem from "../../common/containers/CenteredItem";

const App = () => {
  const blockSize = useSelector(selectBlockSize);

  return (
    <CenteredGrid spacing={1} direction={"column"}>
      <CenteredItem>
        <h1>Block Viewer</h1>
      </CenteredItem>
      <CenteredItem>
        <code>block size: {blockSize} Bytes</code>
      </CenteredItem>
      <CenteredItem>
        <FileSelection />
      </CenteredItem>
    </CenteredGrid>
  );
};

export default App;
