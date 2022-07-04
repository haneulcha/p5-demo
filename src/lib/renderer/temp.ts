import p5 from 'p5';
// import { mapKeys } from "lodash-es";

interface SkeletonRendererOptions {
  background?: string;
  dimension?: { width: number; height: number };
  offset?: { x: number; y: number };
}

interface Dimension {
  width: number;
  height: number;
}

let x = 100;
let y = 100;

let fabrics = [];
let fabricsKeys = [];
let initialized = false;
// let options.dimension = { width: 128, height: 96 };
// let options.offset = { x: 0.2, y: 0.2 };

const s = (p: p5) => {
  p.setup = function () {
    p.createCanvas(128, 96);
    p.noLoop();
  };

  p.draw = function () {
    p.background(0);
  };
};

let myp5 = (node: HTMLElement) => {
  return new p5(s, node);
};

class renderer {
  private p5: p5;
  private options: SkeletonRendererOptions;
  //   private fabrics: Array<Line | Circle>;
  //   private fabricsKeys: string[];
  //   private initialized: boolean;

  constructor(node: HTMLElement, options: SkeletonRendererOptions) {
    // this.p5 = new p5(this.sketch, node);

    this.p5 = myp5(node);
    this.options = { ...options };
    // this.fabrics = [];
    // this.fabricsKeys = [];
    // this.initialized = false;
    this.options.dimension = { width: 128, height: 96 };
    this.options.offset = { x: 0.2, y: 0.2 };
    // this.canvas.setDimensions(this.options.dimension);
  }

  public render() {
    this.drawFacePoint(10, Math.floor(Math.random() * 100), 'eye', true);
    this.drawJoint(Math.floor(Math.random() * 100), 30, 'hip', true, true, true);
    this.drawLine([2, 5, Math.floor(Math.random() * 100), 44], 'leftArm', true);
  }

  public setDimensions = (dimensions: Dimension) => {
    const { width, height } = dimensions;

    this.options.offset = {
      x: (height * (4 / 3)) / 640,
      y: height / 480,
    };

    this.p5.resizeCanvas(height * (4 / 3), height);
    //   this.canvas.calcOffset();
  };

  private drawJoint = (x: number, y: number, name: string, modifiable: boolean, isLeft: boolean, visible: boolean) => {
    if (!visible) return;
    this.p5.fill(isLeft ? '#CC1937' : '#1860CC');
    this.p5.stroke('#FFF');
    this.p5.strokeWeight(Math.max(0.5, (0.5 * (this.options.offset!.x + this.options.offset!.y)) / 2));
    this.p5.circle(x, y, Math.max(2, (2 * (this.options.offset!.x + this.options.offset!.y)) / 2));
  };

  private drawFacePoint = (x: number, y: number, name: string, visible: boolean) => {
    if (!visible) return;
    this.p5.fill('#fff');
    this.p5.stroke('#8100ff');
    this.p5.strokeWeight(Math.max(0.5, (0.5 * (this.options.offset!.x + this.options.offset!.y)) / 2));
    this.p5.circle(x, y, Math.max(2, (2 * (this.options.offset!.x + this.options.offset!.y)) / 2));
  };

  private drawLine = (coords: number[], name: string, visible: boolean) => {
    if (!visible) return;
    this.p5.stroke('#8100ff');
    this.p5.strokeWeight(Math.max(3, (3 * (this.options.offset!.x + this.options.offset!.y)) / 2));
    this.p5.line(coords[0], coords[1], coords[2], coords[3]);
  };
}

class joint {
  private p5: p5;
  private name: string;
  private bg: string;
  private color: string;
  constructor(p5: p5, x: number, y: number, name: string, modifiable: boolean, isLeft: boolean, visible: boolean) {
    this.p5 = p5;
    this.name = name;
    this.bg = isLeft ? '#CC1937' : '#1860CC';
    this.color = '#FFF';
  }
}

//  circle, line 클래스 생성 -> 배열 ->
export default renderer;
