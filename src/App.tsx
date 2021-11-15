import React, { MouseEvent, useEffect, useRef } from 'react';
import p5 from 'p5';
import rendererP5 from './renderer/index';
import './App.css';

function App() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver>();
  const renderer = useRef<rendererP5>();

  const onBtn = (evt: MouseEvent) => {
    evt.preventDefault();
    if (!renderer.current) return;
    renderer.current.render();
  };

  useEffect(() => {
    if (canvasContainerRef.current) {
      renderer.current = new rendererP5(canvasContainerRef.current, {
        background: 'transparent',
      });

      observerRef.current = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        console.log('observer');
        for (const _ of entries) {
          if (!canvasContainerRef.current) return;

          const canvasContainer = canvasContainerRef.current;

          renderer.current?.setDimensions({
            width: canvasContainer.clientWidth,
            height: canvasContainer.clientHeight,
          });
        }
      });

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
        <button onClick={onBtn}>그리기</button>
        <div className="canvas-container" ref={canvasContainerRef}></div>
      </main>
    </div>
  );
}

export default App;
