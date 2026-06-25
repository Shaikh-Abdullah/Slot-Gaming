export const randomGrid = () => {
  const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣", "⭐"];

  const grid: string[][] = [];

  for (let row = 0; row < 5; row++) {
    const currentRow: string[] = [];

    for (let col = 0; col < 5; col++) {
      currentRow.push(
        symbols[Math.floor(Math.random() * symbols.length)]
      );
    }

    grid.push(currentRow);
  }

  return grid;
};