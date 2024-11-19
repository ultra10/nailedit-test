import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import { Outcome } from "./../../Outcome";

export class ReelActor extends Container {
  private reelId: number;

  private symbols: Sprite[] = [];
  private symbolsUid: Record<number, number> = {};
  private isSpinning: boolean = false;

  private stopInit: boolean = false;
  private stopSymbols: string[] | null = null;
  private symbolsUpdate: number = 0;
  private symbolsUpdated: Record<number, boolean> = {};

  private symbolSize: number = 192;
  private spinTimeline: gsap.core.Timeline;
  private fakeRows: number = 3;
  private visibleRows: number = 3;

  private onStopCallback: Function;

  constructor(
    startSymbols: string[],
    reelId: number,
    onStopCallback: Function
  ) {
    super();
    this.reelId = reelId;
    this.onStopCallback = onStopCallback;
    this.createScene(startSymbols);
  }

  createScene(startSymbols: string[]) {
    for (let i = 0; i < startSymbols.length; i++) {
      const symbol = Sprite.from(startSymbols[i]);
      symbol.anchor.set(0.5);
      this.symbolsUid[symbol.uid] = i;
      symbol.y = i * this.symbolSize + symbol.height / 2;
      symbol.x = symbol.width / 2;
      this.symbols.push(symbol);
      this.addChild(symbol);
    }
    for (let i = 0; i < this.fakeRows; i++) {
      const fakeSymbol = Sprite.from(Outcome.getRandomSymbol());
      fakeSymbol.y = (i + startSymbols.length) * this.symbolSize;
      this.symbols.push(fakeSymbol);
      this.addChild(fakeSymbol);
    }
  }
  spin(speed: number = 2000) {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.stopInit = false;

    const totalDistance = this.symbols.length * this.symbolSize;

    this.spinTimeline = gsap.timeline({ repeat: -1 });

    for (const symbol of this.symbols) {
      const initialY = symbol.y;

      this.spinTimeline.to(
        symbol,
        {
          y: `+=${totalDistance}`,
          duration: totalDistance / speed,
          ease: "linear",
          modifiers: {
            y: (y) => {
              const numericY = parseFloat(y);
              return numericY >=
                totalDistance - this.visibleRows * this.symbolSize
                ? numericY - totalDistance
                : numericY;
            },
          },
          onUpdate: () => {
            this.onStop(symbol);
          },
        },
        0
      );

      symbol.y = initialY;
    }
  }

  onStop(symbol: Sprite) {
    if (!this.stopInit || !this.stopSymbols) return;
    if (symbol.y < 0 || symbol.y >= this.visibleRows * this.symbolSize) {
      const index = this.symbolsUid[symbol.uid];

      if (
        index !== undefined &&
        index < this.stopSymbols.length &&
        this.symbolsUpdated[symbol.uid] === undefined
      ) {
        symbol.texture = Texture.from(this.stopSymbols[index]);
        this.symbolsUpdate++;
        this.symbolsUpdated[symbol.uid] = true;
      }
      if (this.symbolsUpdate == this.visibleRows) {
        this.spinTimeline.repeat(0);
        this.spinTimeline.eventCallback("onComplete", () => {
          this.stopInit = false;
          this.stopSymbols = null;
          this.isSpinning = false;
          this.symbolsUpdate = 0;
          this.symbolsUpdated = {};
          this.onStopCallback(this.reelId);
        });
      }
    }
  }

  stop(stopSymbols: string[]) {
    if (!this.isSpinning) return;
    this.stopInit = true;
    this.stopSymbols = stopSymbols;
  }

  bumpSymbols(bumpArray: number[]) {
    for (let i = 0; i < bumpArray.length; i++) {
      if (bumpArray[i] === 1) {
        const symbol = this.symbols[i];

        gsap.to(symbol.scale, {
          x: 1.5,
          y: 1.5,
          duration: 0.5,
          yoyo: true,
          repeat: 3,
        });
      }
    }
  }
}
