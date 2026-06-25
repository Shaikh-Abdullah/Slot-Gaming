import { useCallback, useEffect, useRef, useState } from "react";
import BetControl from "../components/betControl/BetControl";
import Button from "../components/button/Button";
import PixiSlot from "../components/slotMachine/PixiSlot";
import { randomGrid } from "../utils/randomGrid";
import { checkWin } from "../utils/checkWin";

const Games = () => {
  const [bet, setBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [grid, setGrid] = useState<string[][]>(() => randomGrid());
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const autoRef = useRef<number | null>(null);
  // const TEST_WIN = true;

  const increaseBet = () => setBet((b) => b + 10);

  const decreaseBet = () => {
    setBet((b) => (b > 10 ? b - 10 : 10));
  };

  const handleSpin = useCallback(() => {
    setIsSpinning((prev) => {
      if (prev) return prev;

      setTimeout(() => {
        setIsSpinning(false);

        const nextGrid = randomGrid();

        // To test a winning scenario, uncomment the TEST_WIN code below and comment out randomGrid():
        // const nextGrid = [
        //   ["🍒", "🍒", "🍒", "🍒", "🍒"],
        //   ["🍋", "🔔", "💎", "7️⃣", "⭐"],
        //   ["🍋", "🔔", "💎", "7️⃣", "⭐"],
        //   ["🍋", "🔔", "💎", "7️⃣", "⭐"],
        //   ["🍋", "🔔", "💎", "7️⃣", "⭐"],
        // ];

        setGrid(nextGrid);
        const result = checkWin(nextGrid);

        if (result.win) {
          setToast({ message: `🎉 WIN! Row ${result.row + 1} matched: ${result.symbol}`, type: "success" });
          console.log("🎉 WIN!", result);
        } else {
          setToast(null);
          console.log("😢 LOST");
        }
      }, 800);

      return true;
    });
  }, []);

  useEffect(() => {
    if (autoPlay) {
      autoRef.current = window.setInterval(() => {
        handleSpin();
      }, 1200);
    } else {
      if (autoRef.current) {
        clearInterval(autoRef.current);
        autoRef.current = null;
      }
    }

    return () => {
      if (autoRef.current) {
        clearInterval(autoRef.current);
        autoRef.current = null;
      }
    };
  }, [autoPlay, handleSpin]);

  const toggleAutoPlay = () => {
    setAutoPlay((prev) => !prev);
  };

  const dismissToast = () => setToast(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <div className="border-b border-zinc-800 p-6 text-center">
        <h1 className="text-4xl font-bold text-yellow-400">
          🎰 Slot Game
        </h1>
        <p className="text-sm text-zinc-400">
          Pixi.js + React + TypeScript
        </p>
      </div>

      {/* Game Container */}
      <div className="flex flex-col items-center gap-8 p-10">

        {/* Bet Control */}
        <BetControl
          bet={bet}
          onIncrease={increaseBet}
          onDecrease={decreaseBet}
        />

        {/* PIXI SLOT */}
        <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6 shadow-lg">
          <PixiSlot isSpinning={isSpinning} grid={grid} />
        </div>

        {/* Controls */}
        <div className="flex gap-6">

          <Button onClick={handleSpin} variant="primary">
            🎰 Spin
          </Button>

          <Button
            onClick={toggleAutoPlay}
            variant={autoPlay ? "danger" : "secondary"}
          >
            {autoPlay ? "Stop Auto" : "Auto Play"}
          </Button>

        </div>

        {toast ? (
          <div
            className={`fixed left-1/2 top-8 z-50 -translate-x-1/2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-2xl transition duration-300 ${
              toast.type === "success"
                ? "bg-emerald-500 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span>{toast.message}</span>
              <button
                onClick={dismissToast}
                className="rounded-full bg-black/20 px-2 py-1 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default Games;