import React from "react";
import { useAppDispatch } from "../../hooks";
import { setActiveIndex } from "../../state/fileData/fileDataReducer";

interface CodeSpanProps {
  value: string;
  idx: number;
  activeIndex?: number;
}

const CodeSpan = React.memo(
  ({ value, idx, activeIndex }: CodeSpanProps) => {
    const dispatch = useAppDispatch();

    return (
      <span
        onMouseOver={() => {
          dispatch(setActiveIndex(idx));
        }}
        style={{
          backgroundColor: activeIndex === idx ? "orange" : "white",
        }}
      >
        {value}
      </span>
    );
  },
  (prev, next) =>
    prev.value === next.value &&
    ((prev.idx !== prev.activeIndex && prev.idx !== next.activeIndex) ||
      (prev.idx === prev.activeIndex && prev.idx === next.activeIndex))
);

export default CodeSpan;
