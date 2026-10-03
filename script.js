const trackHeight = 60;
const cloudsSpeedFactor = 0.25;
const mountainsSpeedFactor = 0.5;
const hillsSpeedFactor = 0.75;
const trackSpeedFactor = 1;

let gameSpeed = 1;
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // 1. Load assets
    this.load.image("sky", "assets/sky.png");
    this.load.image("clouds", "assets/clouds.png");
    this.load.image("mountains", "assets/mountains.png");
    this.load.image("hills", "assets/hills.png");
    this.load.image("track", "assets/track.png");
  }

  create() {
    // 2. Create game objects
    this.add.image(0, 0, "sky").setOrigin(0, 0);
    this.cloudsLayer = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "clouds")
      .setOrigin(0, 0);

    this.mountainsLayer = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "mountains")
      .setOrigin(0, 0);

    this.hillsLayer = this.add
      .tileSprite(0, 0, this.scale.width, this.scale.height, "hills")
      .setOrigin(0, 0);

    this.trackLayer = this.add
      .tileSprite(
        0,
        this.scale.height - trackHeight,
        this.scale.width,
        trackHeight,
        "track",
      )
      .setOrigin(0, 0);
  }

  update() {
    // 3. Game logic, every frame
    this.cloudsLayer.tilePositionX += gameSpeed * cloudsSpeedFactor;
    this.mountainsLayer.tilePositionX += gameSpeed * mountainsSpeedFactor;
    this.hillsLayer.tilePositionX += gameSpeed * hillsSpeedFactor;
    this.trackLayer.tilePositionX += gameSpeed * trackSpeedFactor;
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 300,
  pixelArt: true,
  scene: GameScene,
};

new Phaser.Game(config);
