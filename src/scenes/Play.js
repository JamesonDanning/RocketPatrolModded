class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }


    preload() {
//load images and tile sprite
        this.load.image('bobber', './assets/bobber.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('river', './assets/river.png');
        this.load.image('dirt', './assets/dirt.png');
        this.load.spritesheet('explosion', './assets/explosion.png', 
            {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('fish', './assets/fish.png', 
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 4});
    }

    create() {
        //place tile sprite
        this.river = this.add.tileSprite(0, 0, 640, 480, 'river').setOrigin(0, 0);
        this.dirt = this.add.sprite(0, 0, 'dirt').setOrigin(0, 0);

        //this.add.rectangle(5,5,630,32, 0xFFFFFF).setOrigin(0,0);
        //this.add.rectangle(5,443,630,32, 0xFFFFFF).setOrigin(0,0);
        //this.add.rectangle(5,5,32,455, 0xFFFFFF).setOrigin(0,0);
        //this.add.rectangle(603,5,32,455, 0xFFFFFF).setOrigin(0,0);
        //green ui background
        //this.add.rectangle(37, 42, 566, 64, 0x00ff00).setOrigin(0, 0);

        this.anims.create({
            key: 'bob',
            frames: this.anims.generateFrameNumbers('bobber', {start: 0, end: 1, first: 0}, true),
            frameRate: 4,
            repeat: -1
        });

        //add bobber
        this.p1Bobber = new Rocket(this, game.config.width/2, 431, 
            'bobber').setOrigin(0, 0);
        //this.p1Bobber.anims.play('bob');

            //fish swimming anim
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('fish', {start: 0, end: 4, first: 0}, true),
            frameRate: 8,
            repeat: -1
        });
       

            //add fish x3
            this.fish01 = new Spaceship(this, game.config.width + 192, 132, 'fish',
                 0, 30).setOrigin(0,0);
                 this.fish01.anims.play('swim');

             this.fish02 = new Spaceship(this, game.config.width + 96, 196, 'fish',
                 0, 20).setScale(0.75, 0.75).setOrigin(0,0);
                 this.fish02.anims.play('swim');

            this.fish03 = new Spaceship(this, game.config.width, 260, 'fish',
                 0, 10).setScale(0.5, 0.5).setOrigin(0,0);
                 this.fish03.anims.play('swim');

            

            // define keyboard keys
            keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
            
        });

        

        //score
        this.p1Score = 0; 

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor : '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        this.gameOver = false;

        //play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //add fish swimming
        //let fish1 = this.add.sprite(300, 200, 'fish').setOrigin(0, 0);
        //fish1.anims.play('swim');
    }

    update() {

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        //scroll river
        this.river.tilePositionX += 1;

        if(!this.gameOver){
            this.p1Bobber.update();
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
        
        this.sound.play('sfx_explosion');
    }
}