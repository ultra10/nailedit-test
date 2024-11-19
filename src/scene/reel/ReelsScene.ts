import { Container, Graphics, Sprite } from "pixi.js";
import { Outcome } from "../../Outcome";
import { ReelActor } from "./ReelActor";
import { WinLinesActor } from "./WinLinesActor";
import { WIN_LINES } from "../../service/WinLined";

const columns = 5; // move it to some config, best should come form server
const reelSpacing = 200;

export enum ReelsState {
  spinning = "SPINNING",
  stop = "STOP",
}

export class ReelsScene extends Container {
  private reels: ReelActor[] = [];
  public state: ReelsState = ReelsState.stop;
  private stoppedReelsCount: number = 0;
  private winLines: WinLinesActor;
  private onAllReelsStopCallback: Function;

  constructor(onAllReelsStopCallback: Function) {
    super();
    this.onAllReelsStopCallback = onAllReelsStopCallback;
    this.create();
  }

  create() {
    const bg = Sprite.from("reels_base");
    this.addChild(bg);

    const maskRect = new Graphics();
    maskRect.fill(0x000000);
    maskRect.rect(0, 0, bg.width, bg.height);
    maskRect.fill();

    this.addChild(maskRect);
    maskRect.alpha = 0.5;
    this.mask = maskRect;

    const startReelsPos = Outcome.resolve();
    //console.log("Start reels positions:", startReelsPos);

    for (let i = 0; i < columns; i++) {
      const reel = new ReelActor(startReelsPos[i], i, (reelId) => {
        this.onReelStop(reelId);
      });
      reel.position.set(reelSpacing * i - 57, -50);
      this.reels.push(reel);
      this.addChild(reel);
    }

    this.winLines = new WinLinesActor();
    this.addChild(this.winLines);
  }

  spin() {
    this.state = ReelsState.spinning;
    for (const reel of this.reels) {
      reel.spin();
    }
  }

  stop(outcome: string[][]) {
    for (let i = 0; i < this.reels.length; i++) {
      setTimeout(async () => {
        this.reels[i].stop(outcome[i]);
      }, 250 * i);
    }
  }

  showWinLines(winLine: { line: number; symbol: string }[]) {
    winLine.forEach((line) => {
      this.winLines.showLine(line.line);
    });
  }

  hideWinLines() {
    this.winLines.hideLines();
  }

  onReelStop(reelId: number) {
    this.stoppedReelsCount++;

    if (this.stoppedReelsCount === this.reels.length) {
      this.state = ReelsState.stop;
      this.stoppedReelsCount = 0;
      this.onAllReelsStopCallback();
    }
  }

  bumpSymbols(winLine: { line: number; symbol: string }[]) {
    winLine.forEach((line) => {
      for (let i = 0; i < WIN_LINES[line.line].length; i++)
        this.reels[i].bumpSymbols(WIN_LINES[line.line][i]);
    });
  }
}
