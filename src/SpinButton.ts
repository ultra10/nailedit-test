import { Container, Sprite } from "pixi.js";

export class SpinButton extends Container {
  button: Sprite;
  constructor() {
    super();

    this.button = Sprite.from("spin_btn_normal");
    this.button.anchor.set(0.5);
    this.button.interactive = true;
    this.button.cursor = "pointer";

    this.button.on("pointerover", () => {
      this.button.texture = Sprite.from("spin_btn_over").texture;
    });

    this.button.on("pointerout", () => {
      this.button.texture = Sprite.from("spin_btn_normal").texture;
    });

    this.button.on("pointerdown", () => {
      this.button.texture = Sprite.from("spin_btn_down").texture;
    });

    this.button.on("pointerup", () => {
      this.button.texture = Sprite.from("spin_btn_hover").texture;
    });

    this.button.on("pointerupoutside", () => {
      this.button.texture = Sprite.from("spin_btn_normal").texture;
    });

    this.addChild(this.button);
  }

  disable() {
    this.button.texture = Sprite.from("spin_btn_disabled").texture;
    this.button.interactive = false;
    this.button.cursor = "default";
  }

  enable() {
    this.button.texture = Sprite.from("spin_btn_normal").texture;
    this.button.interactive = true;
    this.button.cursor = "pointer";
  }

  update(dt: number): void {}
}
