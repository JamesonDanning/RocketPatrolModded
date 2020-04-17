class initScene extends Phaser.Scene {
    constructor(){
        super("initScene")
    }

    preload(){
        this.load.audio('bgmusic', './assets/bgmusic.mp3');
    }

    create(){
        this.bgm = game.sound.add('bgmusic');
        this.bgm.loop = true;
        this.bgm.play();

        this.scene.start("menuScene");
    }
}