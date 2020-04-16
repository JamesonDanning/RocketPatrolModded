class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }


    preload() {
//load images and tile sprite
       
        this.load.spritesheet('bobber', './assets/bobber.png', 
            {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 1});

        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('waterTop', './assets/waterTop.png');
        this.load.image('waterBot', './assets/waterBot.png');
        this.load.image('dirt', './assets/dirt.png');
        this.load.image('kid', './assets/character.png');

        this.load.spritesheet('explosion', './assets/explosion.png', 
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('fish', './assets/fish.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
    }

    create() {
        //place tile sprite
        this.add.rectangle(0,0, 800, 600, 0x0388A6).setOrigin(0,0);
        this.dirt = this.add.sprite(0, 0, 'dirt').setOrigin(0, 0);
        

        //bobber anim
        this.anims.create({
            key: 'bob',
            frames: this.anims.generateFrameNumbers('bobber', {start: 0, end: 1, first: 0}, true),
            frameRate: 4,
            repeat: -1
        });

        //fish swimming anim
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('fish', {start: 0, end: 4, first: 0}, true),
            frameRate: 8,
            repeat: -1
        });

         

        //add kid
        this.player = new Player(this, game.config.width/2, 20, 'kid').setOrigin(0.1);

       

            //add fish x3
            this.fish01 = new Spaceship(this, game.config.width + 192, 200, 'fish',
                 0, 30).setOrigin(0,0);
                 this.fish01.anims.play('swim');

             this.fish02 = new Spaceship(this, game.config.width + 96, 300, 'fish',
                 0, 20).setScale(0.75, 0.75).setOrigin(0,0);
                 this.fish02.anims.play('swim');

            this.fish03 = new Spaceship(this, game.config.width, 375, 'fish',
                 0, 10).setScale(0.5, 0.5).setOrigin(0,0);
                 this.fish03.anims.play('swim');

        
        this.waterBot = this.add.tileSprite(0, 120, 800, 480, 'waterBot').setOrigin(0, 0); 
        this.waterTop = this.add.tileSprite(0, 120, 800, 480, 'waterTop').setOrigin(0, 0);  


        //add bobber
        this.p1Bobber = new Rocket(this, game.config.width/2, 450, 
            'bobber').setOrigin(0, 0);
            this.p1Bobber.anims.play('bob');

            
            
            // define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        

        //explosion anim
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
            
        });

        

       

       
        //score display
        let scoreConfig = {
            fontFamily: 'CasualEncounter',
            fontSize: '18px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 15,
                bottom: 5,
                left: 10,
                right: 10
            },
            fixedWidth: 100
        }

        //score
        this.p1Score = 0; 

        this.scoreLeft = this.add.text(69, 54, 0, scoreConfig);

        this.gameOver = false;


        // //timer countdown display
        // this.timeInSeconds = game.config.gameTimer / 1000;
        // this.scoreDisplay = this.add.text(game.config.width/2, game.config.height/2, 'Counter: 0', { font: "64px Arial", fill: "#ffffff", align: "center" });
        // //this.scoreDisplay.anchor.setTo(0.5, 0.5);

        // this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, 
        //     this);
        
        
        
        //play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'F to Restart or UP for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //this.timeLeft = this.add.text(100, 500, game.settings.timer, scoreConfig);

       
    }



    updateTimer() {
        this.timeInSeconds--;
        var minutes = Math.floor(this.timeInSeconds / 60);
        var seconds = this.timeInSeconds - (minutes * 60);
        var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
        this.timeText.text = timeString;
    
        if (this.timeInSeconds == 0) {
            this.game.state.restart();
        }
    };

    

    updateCounter() {

        counter++;
    
        this.scoreDisplay.text = ('Counter: ' + counter);
    
    }

    update() {

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("menuScene");
        }
        
        //scroll water
        this.waterBot.tilePositionX += 0.75;
        this.waterTop.tilePositionX += 1;

        if(!this.gameOver){
            this.p1Bobber.update();
            this.player.update();
            this.fish01.update();
            this.fish02.update();
            this.fish03.update();
        }

        if(this.checkCollision(this.p1Bobber, this.fish03)) {
            this.p1Bobber.reset();
            this.shipExplode(this.fish03);   
        }
        if (this.checkCollision(this.p1Bobber, this.fish02)) {
            this.p1Bobber.reset();
            this.shipExplode(this.fish02);
        }
        if (this.checkCollision(this.p1Bobber, this.fish01)) {
            this.p1Bobber.reset();
            this.shipExplode(this.fish01);
        }
        
    }

    

    checkCollision(bobber, ship) {
        if (bobber.x < ship.x + ship.width &&
            bobber.x + bobber.width > ship.x &&
            bobber.y < ship.y + ship.height &&
            bobber.height + bobber.y > ship.y) {
                return true;
        } else {
            return false
        }
    }


    shipExplode(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;    
        
        this.sound.play('sfx_splash');
        //this.sfxReel.stop();
    }
}