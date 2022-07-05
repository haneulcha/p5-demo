import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
import { PixelInput } from '@tensorflow-models/pose-detection/dist/shared/calculators/interfaces/common_interfaces';
import { p5PoseUpdate } from '../renderer';

class PoseDetect {
  private detector: poseDetection.PoseDetector | null = null;
  private video: PixelInput;

  public poses: poseDetection.Pose[] = [];

  private rafId: number | null = null;
  private startInferTime: number = 0;
  private endInferTime: number = 0;

  constructor(video: PixelInput) {
    this.video = video;
  }

  async createDetector() {
    const detectorConfig: poseDetection.ModelConfig = {
      architecture: 'MobileNetV1',
      inputResolution: { width: 640, height: 480 },
      outputStride: 16,
      multiplier: 0.75,
    };
    const model = poseDetection.SupportedModels.MoveNet;

    try {
      this.detector = await poseDetection.createDetector(model, detectorConfig);
      console.log('detector created');
    } catch (error) {
      this.detector = null;
      alert(error);
    }
  }

  async detectPoses() {
    if (!this.detector) return;
    try {
      const estimationConfig: poseDetection.PoseNetEstimationConfig = {
        maxPoses: 5,
        flipHorizontal: false,
        scoreThreshold: 0.5,
        nmsRadius: 20,
      };
      const poses = await this.detector?.estimatePoses(this.video, estimationConfig);
      this.poses = poses;
      if (poses.length) p5PoseUpdate(poses[0]);
    } catch (error) {
      this.detector.dispose();
      this.detector = null;
      alert(error);
    }
  }

  async startEstimate() {
    try {
      await this.detectPoses();
    } catch (err) {
      console.error(err);
    }
    this.rafId = requestAnimationFrame(() => this.startEstimate());
  }

  async stopEstimate() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.detector) {
      this.detector.dispose();
      this.detector = null;
    }
  }

  beginInference() {
    this.startInferTime = (performance || Date).now();
  }

  endInference() {
    this.endInferTime = (performance || Date).now();
    const totalInferTime = this.startInferTime - this.endInferTime;
    console.log(`inference time: ${totalInferTime}ms`);
  }
}

export default PoseDetect;
