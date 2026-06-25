interface BetControlProps {
  bet: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const BetControl = ({
  bet,
  onIncrease,
  onDecrease,
}: BetControlProps) => {
  return (
    <div className="flex items-center gap-6 rounded-xl bg-zinc-900 p-4 shadow-lg">

      <button
        onClick={onDecrease}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-xl font-bold hover:bg-red-400"
      >
        -
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          Bet Amount
        </p>

        <h2 className="text-3xl font-bold text-yellow-400">
          ${bet}
        </h2>
      </div>

      <button
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-xl font-bold hover:bg-green-400"
      >
        +
      </button>

    </div>
  );
};

export default BetControl;