class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }

    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_cast', './assets/cast.wav');
        this.load.audio('sfx_reel', './assets/reel.wav');
        this.load.audio('sfx_splash', './assets/splash.wav');
        this.load.image('title', './assets/title.png');

    }
    create() {

        // let menuConfig = {
        //     fontFamily: 'CasualEncounter',
        //     fontSize: '18px',
        //     //backgroundColor : '#F3B141',
        //     color: '#ffffff',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // }

        // //menu text
        // let centerX = game.config.width/2;
        // let centerY = game.config.height/2;
        // let textSpacer = 64;

        // this.add.text(centerX, centerY- textSpacer, 'Uncle Jim\'s shitty fishing trip', menuConfig).setOrigin(0.5);
        // this.add.text(centerX, centerY, 'Use arrows <--> to move & (F) to reel in', 
        //     menuConfig).setOrigin(0.5);
        // //menuConfig.backgroundColor = '#00ff00';
        // //menuConfig.color = '#000';
        // this.add.text(centerX, centerY + textSpacer, 'Press <- for Easy or-> for Hard', menuConfig).setOrigin(0.5);


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