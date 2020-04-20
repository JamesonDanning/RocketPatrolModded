/*
Jameson Danning
points breakdown:

Redesign game theme/art to non sci-fi: 50
parallax scrolling(in my water to simulate depth): 15
new title screen: 15
display time remaining: 15
control rocket after fire: 10
added copyright free bg music : 10
tracks highscore:10

#FACADE tier:
gave the game a story: 10???


Sources:
bg music - Made by Enrico Widodo, used with permission, copyright free
Splash - Paulprit, modified length https://freesound.org/people/paulprit/sounds/507094/
Fishing reel - Luann wepener, modified length https://freesound.org/people/LuannWepener/sounds/326105/
font - CasualEncounter by Anna Anthropy

*/

let config = {

    type:  Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: [initScene, story, Menu, Play ],
};

let game = new Phaser.Game(config);
let highscore = 0;

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT, keyUP;

