import { Pose } from '@tensorflow-models/pose-detection';
import p5 from 'p5';

let _poses: Pose[] = [];

export const p5PoseUpdate = (poses: Pose[]) => {
  _poses = poses;
};

const sketch = (p: p5) => {
  p.setup = function () {
    const canvas = p.createCanvas(200, 200);
    canvas.parent('canvas-container');
    p.background('violet');
  };

  p.draw = function () {
    console.log(_poses[0]);
  };
};

const initP5 = () => {
  console.log('init p5');
  return new p5(sketch);
};

export default initP5;
