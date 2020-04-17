class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this);// add to existing, dispplay list, update list
        this.isFiring = false;   //track rockets firing stats

        this.sfxReel = scene.sound.add('sfx_reel'); // add rocket sfx
    }

    update() {
        // left/right movement
        //if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= 150){
                this.x -= 2;
            } else if(keyRIGHT.isDown && this.x <= 635) {
                this.x += 2;
            }
        //}
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxReel.play({volume: 5});
        }
        //if fired move up
        if(this.isFiring && this.y >= 120) {
            this.y -= 2;
        }
        //reset on miss
        if(this.y <= 120) {
            this.reset();
        }
    }

    reset() {
        this.isFiring = false;
            this.y = 525;
    }
}