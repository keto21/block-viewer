import { Grid } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { setName, initData } from "../../state/fileData/fileDataReducer";
import BlockSelector from "./BlockSelector";
import CenteredGrid from "../containers/CenteredGrid";
import CenteredItem from "../containers/CenteredItem";
import "./FileSelection.css";
import OutputArea from "../components/OutputArea";
import FileInfo from "./FileInfo";

const FileSelection = () => {
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reader] = useState<FileReader>(new FileReader());
  const [readerData, setReaderData] = useState<Uint8Array | null>(null);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target) {
      alert("Error: no target found");
      return;
    }

    const file = target?.files?.item?.(0);
    if (!file) {
      alert("Error: no file selected");
      return;
    }

    setSelectedFile(file);
  };

  useEffect(() => {
    if (!selectedFile) return;

    // This will be reflected pretty much immediately.
    dispatch(setName(selectedFile.name));

    // However, this action can take a bit, if the file is large (> 1 GB).
    reader.readAsArrayBuffer(selectedFile);

    // TODO: Loading indicator.
  }, [dispatch, reader, selectedFile]);

  reader.onload = (event: ProgressEvent<FileReader>) => {
    const target = event?.target?.result;
    if (!target) return;
    if (typeof target === "string" || target instanceof String) {
      alert("Error: target has unknown type");
      setIsFileLoaded(false);
      return;
    }

    const data = new Uint8Array(target as ArrayBuffer);
    // Putting the data into the redux store is a very, very bad idea performancewise.
    // Therefore we use a local state to store the data, which is significantly faster.
    // E.g. using the redux store and a file with 100 MB took around 10 seconds to load, now it's pretty much instant.
    setReaderData(data);
    setIsFileLoaded(true);

    dispatch(initData(data));
  };

  return (
    <CenteredGrid spacing={0}>
      <Grid item className={"input-file-container"}>
        <input
          type={"file"}
          onChange={handleChange}
          id={"loadInput"}
          className={"input-file"}
        />
        <label
          tabIndex={0}
          htmlFor="loadInput"
          className={"input-file-trigger"}
        >
          Load file ...
        </label>
      </Grid>
      {isFileLoaded && (
        <>
          <CenteredItem>
            <FileInfo />
          </CenteredItem>
          <CenteredItem>
            <BlockSelector />
          </CenteredItem>
          <CenteredItem>
            <OutputArea readerData={readerData} />
          </CenteredItem>
        </>
      )}
    </CenteredGrid>
  );
};

export default FileSelection;
