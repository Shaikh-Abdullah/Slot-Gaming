import { Routes, Route } from "react-router-dom";
import Intro from "../pages/Intro";
import Games from "../pages/Games";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/game" element={<Games />} />
    </Routes>
  );
};

export default AppRouter;