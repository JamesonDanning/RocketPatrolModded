class story extends Phaser.Scene {
    constructor(){
        super("storyScene")
    }

preload(){
    this.load.image('story', './assets/screen2.png');
    this.load.audio('sfx_select', './assets/blip_select12.wav');
}

create(){
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.story = this.add.sprite(0,0,'story').setOrigin(0,0);
}

update(){
    
    if (Phaser.Input.Keyboard.JustDown(keyF)) {
       this.sound.play('sfx_select');
       this.scene.start("playScene");    
      }
}
}