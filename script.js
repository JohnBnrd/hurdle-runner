const cloudsSpeedFactor = 0.25;
const mountainsSpeedFactor = 0.5;
const hillsSpeedFactor = 0.75;
const trackSpeedFactor = 1;

const trackHeight = 60;
const runnerTrackOffset = 25;
const groundHeight = 20;

const jumpPower = -440;

const fireBallHeightOffset = 40;
const fireBallWidth = 72;
const fireBallSpeed = -250;

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

    this.load.spritesheet("runner", "assets/runner.png", {
      frameWidth: 96,
      frameHeight: 128,
    });

    this.load.spritesheet("fireball", "assets/fireball.png", {
      frameWidth: 72,
      frameHeight: 44,
    });
  }

  create() {
    // 2. Create game objects
    // 1. BACKGROUND & PARALLAX LAYERS (rendered back to front)
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

    // Foreground track
    this.trackLayer = this.add
      .tileSprite(
        0,
        this.scale.height - trackHeight,
        this.scale.width,
        trackHeight,
        "track",
      )
      .setOrigin(0, 0);

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("runner", { start: 10, end: 14 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("runner", { start: 15, end: 19 }),
      frameRate: 10,
      repeat: 0,
    });

    const runnerX = 100;
    const runnerY = this.scale.height - trackHeight + runnerTrackOffset;
    this.runner = this.physics.add
      .sprite(runnerX, runnerY, "runner")
      .setOrigin(0.5, 1)
      .play("run");

    const floor = this.add
      .rectangle(0, runnerY, this.scale.width, groundHeight)
      .setOrigin(0, 0);

    this.physics.add.existing(floor, true);

    this.physics.add.collider(this.runner, floor);

    this.spaceKey = this.input.keyboard.addKey("SPACE");

    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fireball", {
        start: 0,
        end: 15,
      }),
      frameRate: 15,
      repeat: -1,
    });

    const fireBallY = runnerY - fireBallHeightOffset;
    const fireBallX = this.scale.width + fireBallWidth / 2;
    this.fireball = this.physics.add
      .sprite(fireBallX, fireBallY, "fireball")
      .setOrigin(0.5, 0.5)
      .setVelocityX(fireBallSpeed)
      .play("burn");

    this.fireball.body.setAllowGravity(false);
  }

  update() {
    // 3. Game logic, every frame
    this.cloudsLayer.tilePositionX += gameSpeed * cloudsSpeedFactor;
    this.mountainsLayer.tilePositionX += gameSpeed * mountainsSpeedFactor;
    this.hillsLayer.tilePositionX += gameSpeed * hillsSpeedFactor;
    this.trackLayer.tilePositionX += gameSpeed * trackSpeedFactor;

    if (
      Phaser.Input.Keyboard.JustDown(this.spaceKey) &&
      this.runner.body.touching.down
    ) {
      this.runner.setVelocityY(jumpPower);
      this.runner.play("jump");
    } else if (this.runner.body.touching.down) {
      this.runner.play("run", true);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 300,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: true,
    },
  },
  scene: GameScene,
};

new Phaser.Game(config);
