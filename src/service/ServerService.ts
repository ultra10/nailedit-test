import { Outcome } from "../Outcome";
import { EventsEmitter } from "../util/EventsEmitter";
import { SpinResultResponse } from "./ServerResponseDTO";
import { WIN_LINES } from "./WinLined";

const defaultServerLag = 500; // ms

export enum ServerMsg {
  SpinResult = "spinResult",
}

export class ServerService extends EventsEmitter {
  constructor() {
    super();

    this.eventsList = {
      spinResult: [],
    };
  }

  spin() {
    const result = Outcome.resolve();

    const data: SpinResultResponse = {
      result: result,
      winLine: this.calculetWinLines(result),
    };

    setTimeout(() => {
      this.emitEvent(ServerMsg.SpinResult, data);
    }, defaultServerLag);
  }

  calculetWinLines(result: string[][]): { line: number; symbol: string }[] {
    const winningLines: { line: number; symbol: string }[] = [];

    WIN_LINES.forEach((linePattern, lineIndex) => {
      const symbols: string[] = [];

      for (let col = 0; col < linePattern.length; col++) {
        for (let row = 0; row < linePattern[col].length; row++) {
          if (linePattern[col][row] === 1) {
            symbols.push(result[col][row]);
          }
        }
      }

      const firstSymbol = symbols[0];
      if (symbols.every((symbol) => symbol === firstSymbol)) {
        winningLines.push({ line: lineIndex, symbol: firstSymbol });
      }
    });

    return winningLines;
  }
}
