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
    this.sceneFile = "assets/Scenes/Level0.json";

    this.sceneParser = null;
    this.mCameras = [];
    this.mPlatformAttrs = [];
    this.mWallAttrs = [];
    this.mTextAttrs = [];
    this.mHumanAttrs = [];
    
    this.mCamera = null;
    this.mHero = null;
    this.mCatherine = null;   
    this.mFlower = null;
    this.mGameStatus = 0;

    this.nextLevel = null;
    this.thisLevel = null;
    
    this.mAllPlatforms = new GameObjectSet();
    this.mAllHumans = new GameObjectSet();

    this.mTexts = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    this.kPlatformTexture = "assets/Ground.png";
    this.kWallTexture = "assets/wall.png";
    this.kHeroSprite = "assets/Me.png";
    this.kCatherine = "assets/Catherine.png";
    this.kHuman = "assets/Human.png";
    this.kFlower = "assets/flower.png";
    this.kFontCon72 = "assets/fonts/Consolas-72";
    
    this.sceneParser = null;
    this.mCameras = [];
    this.mPlatformAttrs = [];
    this.mWallAttrs = [];
    this.mTextAttrs = [];
    this.mHumanAttrs = [];
    
    this.mAllPlatforms = new GameObjectSet();
    this.mAllHumans = new GameObjectSet();
    this.mTexts = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
    
    gEngine.TextFileLoader.loadTextFile(this.sceneFile, gEngine.TextFileLoader.eTextFileType.eJsonFile);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kCatherine);
    gEngine.Textures.loadTexture(this.kHuman);
    gEngine.Textures.loadTexture(this.kFlower);
    gEngine.Fonts.loadFont(this.kFontCon72);
};

MyGame.prototype.unloadScene = function () { 
    gEngine.Core.startScene(this.nextLevel);
};
MyGame.prototype.initialize0 = function () {
    this.thisLevel = new MyGame();
    this.nextLevel = new Level1(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);
};

MyGame.prototype.initialize = function () {
    this.initialize0();
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    //  Cameras
    this.setCameras();
    //  Characters
    this.setHero();
    this.setCatherine();
    this.setHumans();
    this.setFlower();
    //  Floor
    this.setPlatforms();
    this.setWalls();
    //  Text
    this.setTexts();
    //  Status
    this.setStatus();
};
MyGame.prototype.setCameras = function() {
    this.mCameras = this.sceneParser.getCameras(this.mCameras);
    this.mCamera = this.mCameras[0];
};
MyGame.prototype.setHero = function() {
    var heroAttr = this.sceneParser.getHeroAttr();
    //  (x, y, width, height, moveSpeed, jumpSpeed);
    this.mHero = new Hero(this.kHeroSprite, heroAttr[0], heroAttr[1], heroAttr[2], heroAttr[3], heroAttr[4], heroAttr[5]);
};
MyGame.prototype.setCatherine = function() {
    var caAttr = this.sceneParser.getCatherineAttr();
    //  (x, y, width, height, chaseSpeed, trigeerDis)
    this.mCatherine = new Catherine(this.kCatherine, caAttr[0], caAttr[1], caAttr[2], caAttr[3], caAttr[4], caAttr[5]);
};
MyGame.prototype.setHumans = function() {
    this.mHumanAttrs = this.sceneParser.getHumansAttr(this.mHumanAttrs);
    if(this.mHumanAttrs !== null) {
        for(var i = 0; i < this.mHumanAttrs.length; i++) {
            var humanAttr = this.mHumanAttrs[i];
            var human = new Human(this.kHuman, humanAttr[0], humanAttr[1], humanAttr[2], humanAttr[3], humanAttr[4], humanAttr[5]);
            this.mAllHumans.addToSet(human);
        }
    }
};
MyGame.prototype.setFlower = function() {
    var flowerAttr = this.sceneParser.getFlowerAttr();
    //  (x, y, width, height)
    this.mFlower = new Flower(this.kFlower, flowerAttr[0], flowerAttr[1], flowerAttr[2], flowerAttr[3]);
};
MyGame.prototype.setPlatforms = function() {
    this.mPlatformAttrs = this.sceneParser.getPlatforms(this.mPlatformAttrs);
    for(var i = 0; i < this.mPlatformAttrs.length; i++) {
        var platformAttr = this.mPlatformAttrs[i];
        var platform = new Platform(this.kPlatformTexture, platformAttr[0], platformAttr[1], platformAttr[2], platformAttr[3]);
        this.mAllPlatforms.addToSet(platform);
    }
};
MyGame.prototype.setWalls = function() {
    this.mWallAttrs = this.sceneParser.getWalls(this.mWallAttrs);
    for(var i = 0; i < this.mWallAttrs.length; i++) {
        var wallAttr = this.mWallAttrs[i];
        var wall = new Wall(this.kWallTexture, wallAttr[0], wallAttr[1], wallAttr[2], wallAttr[3]);
        this.mAllWalls.addToSet(wall);
    }
};
MyGame.prototype.setStatus = function() {
    this.mGameStatus = this.sceneParser.getStatus();
};
MyGame.prototype.setTexts = function() {
    this.mTextAttrs = this.sceneParser.getTexts(this.mTextAttrs);
    if(this.mTextAttrs !== null) {
         for(var i = 0; i < this.mTextAttrs.length; i++) {
            var textAttr = this.mTextAttrs[i];
            var text = new FontRenderable(textAttr[0]);
            text.setFont(this.kFontCon72);
            this.setText(text, textAttr[1], textAttr[2], textAttr[3], textAttr[4]);
            this.mTexts.addToSet(text);
        }
    }
};
MyGame.prototype.setText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};

MyGame.prototype.physicsSimulation = function() {
    //  platform
    gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mCatherine, this.mAllPlatforms);    
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllPlatforms);    
    //  humans
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllHumans);
    //  wall
    gEngine.Physics.processObjSet(this.mHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mCatherine, this.mAllWalls);    
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllWalls);
};
// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.mAllPlatforms.draw(this.mCamera);
    this.mAllWalls.draw(this.mCamera);
    this.mAllHumans.draw(this.mCamera);
    this.mTexts.draw(this.mCamera);
    
    this.mHero.draw(this.mCamera);
    this.mCatherine.draw(this.mCamera);
    this.mFlower.draw(this.mCamera);
};

MyGame.prototype.update = function () {
    this.gameResultDetecting(); // win/lose/    
    this.mCamera.update();  // to ensure proper interpolated movement effects    
    this.mAllWalls.update();    
    this.mAllPlatforms.update();
    //playing
    if (this.mGameStatus === 0) {
        this.showFirstTxt();
        
        this.mHero.update(this.mAllPlatforms);
        this.mCatherine.update();
        this.mAllHumans.update();
        this.mFlower.update(this.mCatherine.getXform().getPosition());
        //  debug
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)){
            gEngine.GameLoop.stop();
        }   
        //  Catherine Chasing
        this.mCatherine.chaseHero(this.mHero);
        //  Humans Chasing
        for(var i = 0; i < this.mAllHumans.size(); i++) {
            this.mAllHumans.getObjectAt(i).chaseHero(this.mHero);
        }
    }        
    // physics simulation
    this.physicsSimulation();
    // win/lose
    if (this.mGameStatus === 1) {
        //if (this.showAnimationLose())
        this.nextLevel = this.thisLevel;
        gEngine.GameLoop.stop();
    }
    if (this.mGameStatus === 2) {
        //if (this.showSecondTxt() < -1){
            gEngine.GameLoop.stop();
       // }
    }
};

MyGame.prototype.showFirstTxt = function() {
    if(this.mTexts.size() === 0) {
        return;
    }
    var delta = 0.01;
    var color1 = this.mTexts.getObjectAt(0).getColor();
    color1[3] -= delta;
    if(color1[3] >= 0) {
        this.mTexts.getObjectAt(0).setColor(color1);
    }
};
MyGame.prototype.showSecondTxt = function() {
    if(this.mTexts.size() === 0) {
        return;
    }
    var delta = 0.01;
    var color2 = this.mTexts.getObjectAt(1).getColor();
    color2[3] -= delta;
    if(color2[3] >= 0)
        this.mTexts.getObjectAt(1).setColor(color2);
    return color2[3];
};

MyGame.prototype.gameResultDetecting = function () {
    if(this.mAllHumans.getHumanChaseResult() 
            || this.mCatherine.getCatchHeroResult()
            || this.mCatherine.getFallingResult()) {
        this.mGameStatus = 1;
    }
    if (this.mFlower.getTouchCatherineResult()) {
        this.mGameStatus = 2;
    }
};
