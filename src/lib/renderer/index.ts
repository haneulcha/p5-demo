import { Keypoint, Pose } from '@tensorflow-models/pose-detection';

import p5 from 'p5';
import FacePoints from './facePoints';

interface IFacePoints {
  key: string;
  element: FacePoints;
}

interface IFacePointsDict {
  [key: string]: number;
}

let _poses: Pose;
// let _keypoints: Keypoint[] = [];
let canvasWidth = 128;
let canvasHeight = 96;
let isInitialized = false;

let facePoints: IFacePoints[] = [];
let facePointsDict: IFacePointsDict = {};

const ACCU = 0.1;
const faceKeypoints = ['left_eye', 'right_eye', 'nose', 'left_ear', 'right_ear'];
const isFacePoint = (keypoint: Keypoint['name']) => faceKeypoints.includes(keypoint ?? '');

export const p5CanvasSize = (width: number, height: number) => {
  canvasWidth = width;
  canvasHeight = height;
};

export const p5PoseUpdate = (poses: Pose) => {
  _poses = poses;

  const dict = poses.keypoints.reduce(
    (acc, keypoint) => ({ ...acc, [keypoint.name as string]: keypoint }),
    {},
  );

  // 얼굴 관련 키
  // 최초 : FacePoints 생성 -> push
  // 이후 : FacePoints 업데이트 -> setPos
  // FacePoints 배열에서 현재의 keypoint.name과 일치하는 객체를 찾아서 업데이트

  for (const keypoint of _poses.keypoints) {
    // if (keypoint.score && keypoint.score <= ACCU) continue;
    console.log({ keypoint });
    if (keypoint.name && isFacePoint(keypoint.name)) {
      console.log('얼굴 정보');
      if (facePointsDict[keypoint.name] === undefined) {
        facePoints.push({ key: keypoint.name, element: new FacePoints(keypoint.x, keypoint.y) });
      } else {
        const idx = facePointsDict[keypoint.name];
        facePoints[idx].element.setPos(keypoint.x, keypoint.y);
      }
    }
  }

  facePointsDict = facePoints.reduce((acc, cur, idx) => ({ ...acc, [cur.key]: idx }), {});
};

const sketch = (p: p5) => {
  p.setup = function () {
    // p.frameRate(30);
    p.createCanvas(canvasWidth, canvasHeight);
  };

  p.draw = function () {
    //@ts-expect-error
    p.clear();

    // console.log(_poses[0]);
    facePoints.forEach(keypoint => {
      keypoint.element.draw(p);
    });
  };
};

const initP5 = (canvasContainer?: HTMLElement) => {
  console.log('init p5');
  return new p5(sketch, canvasContainer);
};

export default initP5;
