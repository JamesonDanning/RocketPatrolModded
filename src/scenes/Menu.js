class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        //load audio
        this.load.audio('bgmusic', './assets/bgmusic.mp3');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_cast', './assets/cast.wav');
        this.load.audio('sfx_reel', './assets/reel.wav');
        this.load.audio('sfx_splash', './assets/splash.wav');
        this.load.image('title', './assets/title.png');

    }
    create() {

      let musicConfig = {
        repeat: -1,
      }
        this.bgm = game.sound.add('bgmusic');
        this.bgm.loop = true;
        this.bgm.play();

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        //this.scene.start("playScene");


        this.title = this.add.sprite(0,0,'title').setOrigin(0,0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
    }
}