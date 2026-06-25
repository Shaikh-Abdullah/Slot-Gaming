import type { Grid, SymbolType } from "../types/slot";

const symbols: SymbolType[] = [
  "cherry",
  "lemon",
  "bell",
  "diamond",
  "seven",
  "star",
];

export const generateRandomGrid = (): Grid => {
  return Array.from({ length: 5 }, () =>
    Array.from(
      { length: 5 },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    )
  );
};