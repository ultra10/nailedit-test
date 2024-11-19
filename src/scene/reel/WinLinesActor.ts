import { Container, Graphics } from "pixi.js";
import { WIN_LINES } from "../../service/WinLined";

export class WinLinesActor extends Container {
  private lineColor: number = 0xffd700;
  private cellWidth: number = 200;
  private cellHeight: number = 200;
  private lines: Graphics[] = [];

  constructor(startX: number = 0, startY: number = 0) {
    super();
    this.drawWinLines(WIN_LINES, startX, startY);
  }

  drawWinLines(winLines: number[][][], startX: number, startY: number) {
    for (const winLine of winLines) {
      const lineGraphic = new Graphics();

      let started = false;
      for (let col = 0; col < winLine.length; col++) {
        for (let row = 0; row < winLine[col].length; row++) {
          if (winLine[col][row] === 1) {
            const x = startX + col * this.cellWidth + this.cellWidth / 2;
            const y = startY + row * this.cellHeight + this.cellHeight / 2;

            if (!started) {
              lineGraphic.moveTo(x, y);
              started = true;
            } else {
              lineGraphic.lineTo(x, y);
            }
          }
        }
      }
      lineGraphic.stroke({ width: 4, color: this.lineColor });
      lineGraphic.visible = false;
      this.lines.push(lineGraphic);
      this.addChild(lineGraphic);
    }
  }

  showLine(lineNumber) {
    this.lines[lineNumber].visible = true;
  }

  hideLines() {
    this.lines.forEach((line) => {
      line.visible = false;
    });
  }
}
