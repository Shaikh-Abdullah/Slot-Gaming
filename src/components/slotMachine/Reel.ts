import { SymbolType } from "../../types/slot";

export const getRandomSymbol = (): SymbolType => {
  const symbols: SymbolType[] = [
    "cherry",
    "lemon",
    "bell",
    "diamond",
    "seven",
    "star",
  ];

  return symbols[Math.floor(Math.random() * symbols.length)];
};