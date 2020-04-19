class story extends Phaser.Scene {
    constructor(){
        super("storyScene")
    }

preload(){
    this.load.image('story', './assets/screen2.png');
}

create(){
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.story = this.add.sprite(0,0,'story').setOrigin(0,0);
}

update(){
    
    if (Phaser.Input.Keyboard.JustDown(keyF)) {
       this.scene.start("playScene");    
      }
}
}