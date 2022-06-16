import { BaseOrAscii, ByteOutputObject } from "./types";

// Can't be used. See comment in charCodeHelper.
const charCodeTable: Record<number, string> = {
  0: "␀",
  1: "␁",
  2: "␂",
  3: "␃",
  4: "␄",
  5: "␅",
  6: "␆",
  7: "␇",
  8: "␈",
  9: "␉",
  10: "␊",
  11: "␋",
  12: "␌",
  13: "␍",
  14: "␎",
  15: "␏",
  16: "␐",
  17: "␑",
  18: "␒",
  19: "␓",
  20: "␔",
  21: "␕",
  22: "␖",
  23: "␗",
  24: "␘",
  25: "␙",
  26: "␚",
  27: "␛",
  28: "␜",
  29: "␝",
  30: "␞",
  31: "␟",
  32: "␠",
  127: "␡",
  160: "▕ ▏",
};

const charCodeHelper = (charCode: number) => {
  return "�";
  // TODO: figure something out
  // Problem: special characters are not the same width as regular characters in non proportional fonts ?!
  // charCodeTable[charCode] ? charCodeTable[charCode] : "�";
};

const convertToChar = (charCode: number) => {
  if (
    charCode < 33 || // control characters
    charCode === 173 || // soft hyphen
    (charCode >= 127 && charCode <= 160) // special characters
  ) {
    return charCodeHelper(charCode);
  } else {
    return String.fromCharCode(charCode);
  }
};

const createFillerString = (
  stringLength: number,
  width: number,
  filler: string
): string => {
  return new Array(width - stringLength + 1).join(filler);
};

const lpad = (s: string, width: number, filler: string = "0"): string =>
  s.length >= width ? s : createFillerString(s.length, width, filler) + s;

const rpad = (s: string, width: number, filler: string = " "): string =>
  s.length >= width ? s : s + createFillerString(s.length, width, filler);

const convertToBaseOrAscii = (
  value: number,
  baseOrAscii: BaseOrAscii,
  paddingLeft: number,
  paddingRight: number
): ByteOutputObject => {
  let convertedValue = convertToChar(value);
  if (baseOrAscii !== "ascii") convertedValue = value.toString(baseOrAscii);

  let paddedValue = lpad(convertedValue, paddingLeft);

  return {
    value: paddedValue,
    space: createFillerString(paddedValue.length, paddingRight, " "),
  };
};

export { convertToBaseOrAscii };
