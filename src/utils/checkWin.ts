export const checkWin = (grid: string[][]) => {
  for (let row = 0; row < 5; row++) {
    const first = grid[row][0];

    const isWin = grid[row].every((cell) => cell === first);

    if (isWin) {
      return {
        win: true,
        row,
        symbol: first,
      };
    }
  }

  return {
    win: false,
    row: -1,
    symbol: null,
  };
};