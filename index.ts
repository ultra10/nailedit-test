import { Application, Assets, Container } from "pixi.js";
import { urls } from "./img";
import { MainScene } from "./src/scene/main/MainScene";

export const screenSize = {
  width: 1920,
  height: 1080,
};

class Game {
  public app: Application;

  constructor() {}

  async initialize(app: Application, urls: any) {
    this.app = app;
    await Assets.load(urls);

    window.addEventListener("resize", this.resize.bind(this));
  }

  setScene(scene: Container) {
    this.app.stage = scene;
  }

  resize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const scaleX = windowWidth / screenSize.width;
    const scaleY = windowHeight / screenSize.height;
    const scale = Math.min(scaleX, scaleY);

    this.app.renderer.resize(windowWidth, windowHeight);
    this.app.stage.scale.set(scale);

    const offsetX = (windowWidth - screenSize.width * scale) / 2;
    const offsetY = (windowHeight - screenSize.height * scale) / 2;
    this.app.stage.position.set(offsetX, offsetY);
  }
}

(async () => {
  const app = new Application();
  await app.init({
    width: screenSize.width,
    height: screenSize.height,
  });
  document.body.appendChild(app.canvas);

  const game = new Game();
  await game.initialize(app, urls);

  const main = new MainScene();
  game.setScene(main);

  app.ticker.add(({ deltaTime }) => {
    main.update(deltaTime);
  });
  globalThis.__PIXI_APP__ = app;
  game.resize();
})();
