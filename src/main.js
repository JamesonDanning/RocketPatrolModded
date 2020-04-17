let config = {

    type:  Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [initScene, Menu, Play ],
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP;

