/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
//    this.kMinionSprite = "assets/Me.png";
    
    this.kPlatformTexture = "assets/Ground.png";
    this.kWallTexture = "assets/wall.png";
    this.kDyePackTexture = "assets/wall.png";
    this.kParticleTexture = "assets/wall.png";
    this.kPrompt = "RigidBody Physics!";
    this.kHeroSprite = "assets/Me.png";
    this.kCatherine = "assets/Catherine.png";
    this.kHuman = "assets/Human.png";
    this.kFlower = "assets/flower.png";
    this.kFontCon72 = "assets/fonts/Consolas-72";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mMsg1 = null;
    this.mMsg2 = null;

    // the hero and the support objects
    this.mHero = null;
    this.mActress = null;   
    this.mFlower = null;
    
//    this.mGameStatus = new GameState();
    this.mGameStatus = 0;
    
//    this.nextLevel = new Level1();
    this.nextLevel = null;
    
    this.mAllPlatforms = new GameObjectSet();
    this.mAllHumans = new GameObjectSet();
    this.mCollidedObj = null;
    this.mAllWalls = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllDyePacks = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kDyePackTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCatherine);
    gEngine.Textures.loadTexture(this.kHuman);
    gEngine.Textures.loadTexture(this.kFlower);
    gEngine.Fonts.loadFont(this.kFontCon72);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kDyePackTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kCatherine);
    gEngine.Textures.unloadTexture(this.kHuman);
    gEngine.Textures.unloadTexture(this.kFlower);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    
    //var nextLevel = new Level1();  // load the next level
    gEngine.Core.startScene(this.nextLevel);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
            // sets the background to gray
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    this.mHero = new Hero(this.kHeroSprite, 20, 25);
    this.mCollidedObj = new Platform(this.kPlatformTexture, 20, 10, this.mHero);
    this.mFlower = new Flower(this.kFlower, 100, 8);
    this.mActress = new Catherine(this.kCatherine, 180, 25);
    
    //mMsg
    this.mMsg = new FontRenderable(this.kPrompt);
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 110);
    this.mMsg.setTextHeight(3);
    
    this.mMsg1 = new FontRenderable("I saw her standing there.");
    this.mMsg1.setFont(this.kFontCon72);
    this._initText(this.mMsg1, 68, 107, [0.9, 0.9, 0.9, 1], 5);

    this.mMsg2 = new FontRenderable("but then I was a zombie.");
    this.mMsg2.setFont(this.kFontCon72);
    this._initText(this.mMsg2, 70, 100, [0.9, 0.9, 0.9, 1], 5);
    
    
    // create a few objects ...
    var i, j, rx, ry, obj, dy, dx;
    
    // the floor and ceiling
    rx = -15;
    for (i = 0; i<9; i++) {
        obj = new Platform(this.kPlatformTexture, rx, 2, this.mHero);
        this.mAllPlatforms.addToSet(obj);
        
//        obj = new Platform(this.kPlatformTexture, rx, 112, this.mHero);
//        this.mAllPlatforms.addToSet(obj);
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
    
    // 
    // the important objects
//    this.mHero = new Hero(this.kMinionSprite, 20, 30);
    
};

MyGame.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mAllPlatforms.draw(this.mCamera);
    this.mAllWalls.draw(this.mCamera);
    this.mAllHumans.draw(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    this.mActress.draw(this.mCamera);
    this.mFlower.draw(this.mCamera);
    
    this.mAllParticles.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
    
//    this.mCollidedObj.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    this.gameResultDetecting();
    
    var func = function(x, y) { this.createParticle.call(this, x, y); };
    
    this.mCamera.update();  // to ensure proper interpolated movement effects    
    this.mAllWalls.update();    
    this.mAllPlatforms.update();
    
    if (this.mGameStatus === 0) {
        this.mHero.update(this.mAllDyePacks, this.mAllPlatforms, this.mAllParticles, this.createParticle);
        this.mActress.update();
        this.mAllHumans.update();
        this.mFlower.update(this.mActress.getXform().getPosition());
    
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
            this.nextLevel = new Level1();
            gEngine.GameLoop.stop();
        }   
    
        this.mActress.chaseHero(this.mHero, 40, 0.5);
        for(var i = 0; i < this.mAllHumans.size(); i++) {
            this.mAllHumans.getObjectAt(i).chaseHero(this.mHero, 40, 0.3);
        }
    }
/*    
        this.mMsg.setText("heroPos: (" + this.mHero.getXform().getXPos().toFixed(2) + ", " + 
            this.mHero.getXform().getYPos().toFixed(2) + ")"
            + " isTouched: " + this.mHero.isGrounded
            + " Status: " + this.mGameStatus);
*/    
    //mMsg
    var delta = 0.01;
    
    var color1 = this.mMsg1.getColor();
    color1[3] -= delta;
    this.mMsg1.setColor(color1);    
    
    // physics simulation
    this._physicsSimulation();
        
    if (this.mGameStatus === 1) {
        this.nextLevel = new MyGame();
        gEngine.GameLoop.stop();
    }
    if (this.mGameStatus === 2) {
        var color2 = this.mMsg2.getColor();
        color2[3] -= delta;
        this.mMsg2.setColor(color2);
        if (color2[3] < -1){
            this.nextLevel = new Level1();
            gEngine.GameLoop.stop();
        }
    }
    
};

MyGame.prototype.gameResultResponse = function() {
    var status = this.mGameStatus;
    if(status === 0) {
        return;
    } else if (status === 1) {
        this.nextLevel = new MyGame();
        gEngine.GameLoop.stop();
        //alert("Lose");
    } else if (status === 2) {
        this.nextLevel = new Level1();
        gEngine.GameLoop.stop();
        //alert("Win");
    }
};

MyGame.prototype.gameResultDetecting = function () {
    if(this.getHumanChaseResult() || this.getActressChaseResult()) {
        this.mGameStatus = 1;
    }
    if (this.getTouchCatherineResult()) {
        this.mGameStatus = 2;
    }
    //this.gameResultResponse();
};

MyGame.prototype.getHumanChaseResult = function() {
    for (var i = 0; i < this.mAllHumans.size(); i++) {
        var human = this.mAllHumans.getObjectAt(i);
        if (human.getCatchHeroResult()) {
            return true;
        }
    }
    return false;
};

MyGame.prototype.getActressChaseResult = function() {
    return this.mActress.getCatchHeroResult();
};

MyGame.prototype.getTouchCatherineResult = function() {
    return this.mFlower.getTouchCatherineResult();
};