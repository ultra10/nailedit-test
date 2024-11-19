import { Container, Text, TextStyle } from "pixi.js";
import { screenSize } from "./../../../index";

export class WinScene extends Container {
  private winText: Text;

  constructor() {
    super();

    const textStyle = new TextStyle({
      fontFamily: "Arial",
      fontSize: 200,
      fill: "#ffcc00",
      fontWeight: "bold",
      stroke: "#000000",
      align: "center",
    });

    this.winText = new Text("YOU WIN", textStyle);
    this.winText.anchor.set(0.5);
    this.winText.x = screenSize.width / 2;
    this.winText.y = screenSize.height / 2 - 300;

    this.addChild(this.winText);
    this.winText.visible = false;
  }

  show() {
    this.winText.visible = true;
  }

  hide() {
    this.winText.visible = false;
  }
}
