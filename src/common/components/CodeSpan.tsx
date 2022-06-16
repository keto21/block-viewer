import React from "react";
import { useAppDispatch } from "../../hooks";
import { setActiveIndex } from "../../state/fileData/fileDataReducer";

interface CodeSpanProps {
  value: string;
  space: string;
  idx: number;
  activeIndex?: number;
}

const CodeSpan = React.memo(
  ({ value, space, idx, activeIndex }: CodeSpanProps) => {
    const dispatch = useAppDispatch();

    return (
      <span>
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
        <span>{space}</span>
      </span>
    );
  },
  (prev, next) =>
    prev.value === next.value &&
    ((prev.idx !== prev.activeIndex && prev.idx !== next.activeIndex) ||
      (prev.idx === prev.activeIndex && prev.idx === next.activeIndex))
);

export default CodeSpan;
