import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import rendererP5 from './renderer/index';
import './App.css';
import { getCameraPermissionState } from './util/user-env';

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

  useEffect(() => {
    const init = async () => {
      const permissionState = await getCameraPermissionState();
    };
    init();
  }, []);

  return (
    <div className="App">
      <main>
        <button onClick={onBtn}>그리기</button>
        <div className="canvas-container" ref={canvasContainerRef}></div>
        <button type="button">카메라</button>
      </main>
    </div>
  );
}

export default App;
