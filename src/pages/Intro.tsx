import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900/70 p-12 text-center shadow-2xl backdrop-blur-md">
        <h1 className="mb-4 text-6xl font-bold text-yellow-400">
          🎰 Slot Machine
        </h1>

        <p className="mb-10 text-lg text-zinc-400">
          Frontend Game Developer Assignment
        </p>

        <Button onClick={() => navigate("/game")}>Start Game</Button>
      </div>
    </div>
  );
};

export default Intro;
