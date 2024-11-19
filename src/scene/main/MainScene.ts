import { Container, Sprite } from "pixi.js";
import { SpinButton } from "../../SpinButton";
import { ReelsScene, ReelsState } from "../reel/ReelsScene";
import { screenSize } from "../../../index";
import { ServerMsg, ServerService } from "../../service/ServerService";
import { SpinResultResponse } from "../../service/ServerResponseDTO";
import { WinScene } from "../win/WinScene";

export class MainScene extends Container {
  private serverSerice: ServerService;
  private spinButton: SpinButton;
  private reelsScene: ReelsScene;
  private winScene: WinScene;
  private winLineResult: { line: number; symbol: string }[] | null;

  constructor() {
    super();

    this.serverSerice = new ServerService();
    this.serverSerice.on(ServerMsg.SpinResult, (result: SpinResultResponse) => {
      this.spinResult(result);
    });

    const background = Sprite.from("background");
    background.position.x = -500;
    background.position.y = -500;
    this.addChild(background);

    const reelsScene = new ReelsScene(() => {
      this.onAllReelsStop();
    });
    reelsScene.position.set(
      screenSize.width * 0.5 - reelsScene.width / 2,
      screenSize.height * 0.5 - reelsScene.height / 2
    );
    this.addChild(reelsScene);
    this.reelsScene = reelsScene;

    const spinButton = new SpinButton();
    spinButton.position.set(screenSize.width * 0.85, screenSize.height * 0.85);
    spinButton.button.on("pointertap", () => {
      if (reelsScene.state === ReelsState.stop) {
        this.winLineResult = null;
        this.reelsScene.spin();
        this.reelsScene.hideWinLines();
        this.winScene.hide();
        this.serverSerice.spin();
      }
    });
    this.addChild(spinButton);

    this.spinButton = spinButton;

    this.winScene = new WinScene();

    this.addChild(this.winScene);
  }

  spinResult(result: SpinResultResponse) {
    this.reelsScene.stop(result.result);

    if (result.winLine.length > 0) {
      this.winLineResult = result.winLine;
    }
  }

  onAllReelsStop() {
    if (this.winLineResult) {
      this.winScene.show();
      this.reelsScene.showWinLines(this.winLineResult);
      this.reelsScene.bumpSymbols(this.winLineResult);
    }
  }

  update(dt) {
    this.spinButton.update(dt);
  }
}
