import { useEffect, useRef } from "react";
import { Application, Container, Graphics, Text } from "pixi.js";

interface PixiSlotProps {
  isSpinning: boolean;
  grid?: string[][];
}

const PixiSlot = ({ isSpinning, grid }: PixiSlotProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    let app: Application;

    const init = async () => {
      app = new Application();

      await app.init({
        width: 450,
        height: 450,
        backgroundColor: 0x111111,
        antialias: true,
      });

      appRef.current = app;

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(app.canvas);
      }

      drawGrid(app, grid);
    };

    init();

    return () => {
      if (!app) return;

      try {
        app.ticker.stop();

        app.stage.removeChildren();

        if (app.canvas?.parentNode) {
          app.canvas.parentNode.removeChild(app.canvas);
        }
      } catch (e) {
        console.log("Pixi safe cleanup:", e);
      }
    };
  }, []);

  const intervalRef = useRef<number | null>(null);
  const startSpin = () => {
    if (!appRef.current) return;

    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      redrawRandom();
    }, 100);
  };

  const stopSpin = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const app = appRef.current;
    if (!app) return;

    drawGrid(app, grid);
  };

  const redrawRandom = () => {
    const app = appRef.current;
    if (!app) return;

    app.stage.removeChildren();

    const container = new Container();
    const size = 90;

    const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣", "⭐"];
    const outputGrid = grid && !isSpinning ? grid : Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)])
    );

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cell = new Graphics();

        cell.rect(col * size, row * size, size - 6, size - 6);
        cell.fill(0x2a2a2a);

        const text = new Text({
          text: outputGrid[row][col],
          style: {
            fontSize: 22,
            fill: 0xffffff,
          },
        });

        text.x = col * size + 30;
        text.y = row * size + 25;

        container.addChild(cell);
        container.addChild(text);
      }
    }

    app.stage.addChild(container);
  };
  useEffect(() => {
    if (!appRef.current) return;

    if (isSpinning) {
      startSpin();
    } else {
      stopSpin();
    }
  }, [isSpinning, grid]);

  const drawGrid = (app: Application, providedGrid?: string[][]) => {
    const container = new Container();

    const outputGrid = providedGrid ?? Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => "🍒")
    );

    const size = 90;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cell = new Graphics();

        cell.rect(col * size, row * size, size - 6, size - 6);
        cell.fill(0x2a2a2a);

        const text = new Text({
          text: outputGrid[row][col],
          style: {
            fontSize: 22,
            fill: 0xffffff,
          },
        });

        text.x = col * size + 30;
        text.y = row * size + 25;

        container.addChild(cell);
        container.addChild(text);
      }
    }

    app.stage.addChild(container);
  };

  return <div ref={containerRef} className="flex justify-center" />;
};

export default PixiSlot;
