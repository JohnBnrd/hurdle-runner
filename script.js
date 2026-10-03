class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    // 1. Charger les fichiers
  }

  create() {
    // 2. Créer les objets du jeu
  }

  update() {
    // 3. Logique à chaque image
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
