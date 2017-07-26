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
    this.kPlatformTexture = "assets/Ground.png";
    this.kWallTexture = "assets/wall.png";
    this.kHeroSprite = "assets/Me.png";
    this.kCatherine = "assets/Catherine.png";
    this.kHuman = "assets/Human.png";
    this.kFlower = "assets/flower.png";
    this.kFontCon72 = "assets/fonts/Consolas-72";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg1 = null;
    this.mMsg2 = null;

    // the hero and the support objects
    this.mHero = null;
    this.mActress = null;   
    this.mFlower = null;
    
    this.mGameStatus = 0;   
    this.nextLevel = null;
    
    this.mAllPlatforms = new GameObjectSet();
    this.mAllHumans = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCatherine);
    gEngine.Textures.loadTexture(this.kHuman);
    gEngine.Textures.loadTexture(this.kFlower);
    gEngine.Fonts.loadFont(this.kFontCon72);
};

MyGame.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kCatherine);
    gEngine.Textures.unloadTexture(this.kHuman);
    gEngine.Textures.unloadTexture(this.kFlower);
    gEngine.Fonts.unloadFont(this.kFontCon72);
    
    gEngine.Core.startScene(this.nextLevel);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 56.25), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]); // sets the background to gray
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3); //control illumination
    
    this.mHero = new Hero(this.kHeroSprite, 20, 25);
    this.mFlower = new Flower(this.kFlower, 100, 8);
    this.mActress = new Catherine(this.kCatherine, 180, 25);
    
    //mMsg    
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
    
};

MyGame.prototype.initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

MyGame.prototype.physicsSimulation = function() {
    
    //platform
    gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mActress, this.mAllPlatforms);    
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllPlatforms);    
    //humans
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllHumans);

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
    
    this.mMsg1.draw(this.mCamera);
    this.mMsg2.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    this.gameResultDetecting(); // win/lose/
    
    this.mCamera.update();  // to ensure proper interpolated movement effects    
    this.mAllWalls.update();    
    this.mAllPlatforms.update();
    
    if (this.mGameStatus === 0) {
        this.mHero.update(this.mAllPlatforms);
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
    
    var delta = 0.01;    
    var color1 = this.mMsg1.getColor();
    color1[3] -= delta;
    this.mMsg1.setColor(color1);    
    
    // physics simulation
    this.physicsSimulation();
        
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

MyGame.prototype.gameResultDetecting = function () {
    if(this.mAllHumans.getHumanChaseResult() || this.mActress.getCatchHeroResult()) {
        this.mGameStatus = 1;
    }
    if (this.mFlower.getTouchCatherineResult()) {
        this.mGameStatus = 2;
    }
};
