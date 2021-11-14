import p5 from "p5";

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
let options: SkeletonRendererOptions;
let fabrics = [];
let fabricsKeys = [];
let initialized = false;
// let options.dimension = { width: 128, height: 96 };
// let options.offset = { x: 0.2, y: 0.2 };

const s = (p: p5) => {
  p.setup = function () {
    p.createCanvas(
      options.dimension?.width || 128,
      options.dimension?.height || 96
    );
  };

  p.draw = function () {
    p.resizeCanvas(
      options.dimension?.width || 128,
      options.dimension?.height || 96
    );
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
    p.circle(30, 30, 20);
  };
};

let myp5 = (node: HTMLElement, opt: SkeletonRendererOptions) => {
  options = { ...opt };
  options.dimension = { width: 128, height: 96 };
  options.offset = { x: 0.2, y: 0.2 };
  return new p5(s, node);
};

export const setDimensions = (dimensions: Dimension) => {
  const { width, height } = dimensions;
  console.log("dimension");

  options.offset = {
    x: (height * (4 / 3)) / 640,
    y: height / 480,
  };

  options.dimension = {
    width: height * (4 / 3),
    height,
  };

  //   this.canvas.calcOffset();
};

export default myp5;

// class renderer {
//   private p5: p5;
//   private options: SkeletonRendererOptions;
//   private yPos: number;
//   //   private fabrics: Array<Line | Circle>;
//   //   private fabricsKeys: string[];
//   //   private initialized: boolean;

//   constructor(node: HTMLElement, options: SkeletonRendererOptions) {
//     // this.p5 = new p5(this.sketch, node);

//     this.p5 = myp5(node);
//     this.options = { ...options };
//     // this.fabrics = [];
//     // this.fabricsKeys = [];
//     // this.initialized = false;
//     this.yPos = 0;
//     this.options.dimension = { width: 128, height: 96 };
//     this.options.offset = { x: 0.2, y: 0.2 };
//     // this.canvas.setDimensions(this.options.dimension);
//   }

//   draw() {
//     // this.p5.background(204);
//     // this.yPos = this.yPos - 1;
//     // if (this.yPos < 0) {
//     //   this.yPos = this.p5.height;
//     // }
//     // this.p5.line(0, this.yPos, this.p5.width, this.yPos);

//     x = x + 1;
//     y = y + 1;
//   }

//   public render() {
//     this.p5.draw();
//   }
// }

// export default renderer;
