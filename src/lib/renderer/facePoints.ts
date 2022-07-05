import p5 from 'p5';

class FacePoints {
  private posX: number;
  private posY: number;

  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }

  setPos(x: number, y: number) {
    this.posX = x;
    this.posY = y;
  }

  draw(p5: p5) {
    p5.push();

    p5.translate(this.posX, this.posY);
    p5.noStroke();
    p5.fill('orange');
    p5.ellipse(0, 0, 10);

    p5.pop();
  }
}

export default FacePoints;
