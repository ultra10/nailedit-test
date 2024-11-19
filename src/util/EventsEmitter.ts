export class EventsEmitter {
  public eventsList: Record<string, Function[]>;

  constructor() {
    this.eventsList = {};
  }

  on(eventName: string, fun: Function): boolean {
    if (this.eventsList[eventName] === undefined) {
      this.eventsList[eventName] = [];
    }
    if (typeof fun === "function") {
      this.eventsList[eventName].push(fun);
      return true;
    } else {
      console.log("secend param is not a function");
      return false;
    }
  }

  emitEvent(eventName: string, param: any = {}): void {
    this.eventsList[eventName].map((elem) => {
      elem(param);
    });
  }

  removeAllEventListeners(eventName: string): void {
    if (this.eventsList[eventName] !== undefined) {
      this.eventsList[eventName] = [];
    }
  }

  removeEventListener(eventName: string, fun: Function): void {
    if (this.eventsList[eventName] !== undefined) {
      for (var i = 0; i < this.eventsList[eventName].length; i++) {
        if (this.eventsList[eventName][i] == fun) {
          this.eventsList[eventName].splice(i, 1);
        }
      }
    }
  }
}
