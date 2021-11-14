import React, { useEffect, useRef } from "react";
import p5 from "p5";
import rendererP5, { setDimensions } from "./renderer/index";
import "./App.css";

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver>();
  const renderer = useRef<p5>();

  useEffect(() => {
    if (canvasContainerRef.current) {
      renderer.current = rendererP5(canvasContainerRef.current, {
        background: "transparent",
      });

      observerRef.current = new ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          console.log("observer");
          for (const _ of entries) {
            if (!canvasContainerRef.current) return;

            const canvasContainer = canvasContainerRef.current;

            setDimensions({
              width: canvasContainer.clientWidth,
              height: canvasContainer.clientHeight,
            });
          }
        }
      );

      observerRef.current.observe(canvasContainerRef.current);

      return () => {
        // rendererRef.current?.destroy();
        observerRef.current?.disconnect();
      };
    }
  }, []);

  return (
    <div className="App">
      <main>
        <div className="canvas-container" ref={canvasContainerRef}></div>
      </main>
    </div>
  );
}

export default App;
