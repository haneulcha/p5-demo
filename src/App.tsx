import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { getCameraPermissionState, getUserMedia } from './util/user-env';
import PoseDetect from './lib/pose-detect';
import initP5, { p5CanvasSize } from './lib/renderer';

function App() {
  const [isInitialized, setInitialized] = useState(false);
  const cameraRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream>();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const observerRef = useRef<ResizeObserver>();
  const [poseDetector, setPoseDetector] = useState<PoseDetect | null>(null);
  // const renderer = useRef<rendererP5>();

  // const onBtn = (evt: MouseEvent) => {
  //   evt.preventDefault();
  //   if (!renderer.current) return;
  //   renderer.current.render();
  // };

  // useEffect(() => {
  //   if (canvasContainerRef.current) {
  //     renderer.current = new rendererP5(canvasContainerRef.current, {
  //       background: 'transparent',
  //     });

  //     observerRef.current = new ResizeObserver((entries: ResizeObserverEntry[]) => {
  //       console.log('observer');
  //       for (const _ of entries) {
  //         if (!canvasContainerRef.current) return;

  //         const canvasContainer = canvasContainerRef.current;

  //         renderer.current?.setDimensions({
  //           width: canvasContainer.clientWidth,
  //           height: canvasContainer.clientHeight,
  //         });
  //       }
  //     });

  //     observerRef.current.observe(canvasContainerRef.current);

  //     return () => {
  //       // rendererRef.current?.destroy();
  //       observerRef.current?.disconnect();
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (!isInitialized || !poseDetector) return;

    console.log('useEffect :: estimate');
    const estimate = async () => {
      await poseDetector.startEstimate();
    };

    estimate();
    initP5(canvasContainerRef?.current ?? undefined);
  }, [isInitialized, poseDetector]);

  useEffect(() => {
    if (isInitialized) return;
    const setupCamera = async () => {
      const camera = cameraRef.current;
      if (!camera) return;

      const stream = await getUserMedia();
      if (!stream) return;

      streamRef.current = stream;
      camera.srcObject = stream;

      await new Promise(resolve => {
        camera.onloadedmetadata = () => {
          resolve(camera);
        };
      });

      p5CanvasSize(camera.videoWidth, camera.videoHeight);

      // detector load
      const detector = new PoseDetect(camera);
      await detector.createDetector();
      setPoseDetector(detector);
    };

    const init = async () => {
      const permissionState = await getCameraPermissionState();
      console.log({ permissionState });
    };

    init();
    setupCamera();
    setInitialized(true);
  }, [isInitialized]);

  return (
    <div className="App">
      <main>
        {/* <button onClick={onBtn}>그리기</button> */}
        <div id="canvas-container" ref={canvasContainerRef}></div>
        <div className="camera-container">
          <video ref={cameraRef} autoPlay />
        </div>
        <button type="button">카메라</button>
      </main>
    </div>
  );
}

export default App;
