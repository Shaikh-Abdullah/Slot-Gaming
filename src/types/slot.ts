export type SymbolType = | "cherry"
  | "lemon"
  | "bell"
  | "diamond"
  | "seven"
  | "star";

  export type Grid = SymbolType[][];

  export interface GameState {
    grid: Grid;
    bet: number;
    isSpinning: boolean;
    autoPlay: boolean;
  }