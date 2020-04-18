class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this);// add to existing, dispplay list, update list
        //this.isFiring = false;   //track rockets firing stats

        //this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // left/right movement
        
        if(keyLEFT.isDown && this.x >= 150){
            this.x -= 2;
        } else if(keyRIGHT.isDown && this.x <= 635) {
            this.x += 2;
        }
        
        
    }
}