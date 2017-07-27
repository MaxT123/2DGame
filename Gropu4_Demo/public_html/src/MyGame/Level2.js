/*
 * File: Level2.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level2() {    
<<<<<<< HEAD
    this.mAllPlatforms = new GameObjectSet();
    this.mAllHumans = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
}
gEngine.Core.inheritPrototype(Level2, MyGame);

Level2.prototype.initialize = function () {
    //initialize gamestatus, camera, illumination
    this.initialize0();
    this.nextLevel = new MyGame();
    //gerenate map : loadMap();
    //character
    this.mHero = new Hero(this.kHeroSprite, 20, 25);
    this.mFlower = new Flower(this.kFlower, 100, 8);
    this.mCatherine = new Catherine(this.kCatherine, 180, 25);   
    var human = new Human(this.kHuman, 100, 25);
    this.mAllHumans.addToSet(human);
    //Msg    
    this.mMsg1 = new FontRenderable("I saw her standing there.");
    this.mMsg1.setFont(this.kFontCon72);
    this.initText(this.mMsg1, 68, 107, [0.9, 0.9, 0.9, 1], 5);
    this.mMsg2 = new FontRenderable("but then I was a zombie.");
    this.mMsg2.setFont(this.kFontCon72);
    this.initText(this.mMsg2, 70, 100, [0.9, 0.9, 0.9, 1], 5);    
    // the floor and ceiling
    var i, rx, ry, obj;
    rx = -15;
    for (i = 0; i<9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 2);
        this.mAllPlatforms.addToSet(obj);
        rx += 30;
    } 
    // the left and right walls
    ry = 12;
    for (i = 0; i<8; i++) {
        obj = new Wall(this.kWallTexture, 5, ry);
        this.mAllPlatforms.addToSet(obj);
        
        obj = new Wall(this.kWallTexture, 195, ry);
        this.mAllPlatforms.addToSet(obj);
        ry += 16;
    }          
=======
    this.sceneFile = "assets/Scenes/Level2.json";    
}
gEngine.Core.inheritPrototype(Level2, MyGame);

Level2.prototype.initialize0 = function () {
    this.thisLevel = new Level2();
    this.nextLevel = new MyGame(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
>>>>>>> master
};

