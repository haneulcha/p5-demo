import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';

class PoseDetect {
  private detector: poseDetection.PoseDetector | null = null;
  constructor() {}

  async createDetector() {
    const detectorConfig: poseDetection.ModelConfig = {
      architecture: 'MobileNetV1',
      inputResolution: { width: 640, height: 480 },
      outputStride: 16,
      multiplier: 0.75,
    };

    const model = poseDetection.SupportedModels.MoveNet;
    this.detector = await poseDetection.createDetector(model, detectorConfig);
  }

  async estimate() {
    if (!this.detector) return;
    try {
      const estimationConfig: poseDetection.PoseNetEstimationConfig = {
        maxPoses: 5,
        flipHorizontal: false,
        scoreThreshold: 0.5,
        nmsRadius: 20,
      };
      // const poses = await this.detector?.estimatePoses(image, estimationConfig);
    } catch (error) {
      this.detector.dispose();
      this.detector = null;
      alert(error);
    }
  }
}

export default PoseDetect;
