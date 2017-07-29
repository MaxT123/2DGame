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

function LevelFinal() {    
    this.sceneFile = "assets/Scenes/LevelFinal.json";    
}
gEngine.Core.inheritPrototype(LevelFinal, MyGame);

LevelFinal.prototype.initialize0 = function () {
    this.thisLevel = new LevelFinal();
    this.nextLevel = new MyGame(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
};

LevelFinal.prototype.showAnimationWin = function(){
    var delta =0.005;
    var color1 = this.mTexts.getObjectAt(1).getColor();
    
    this.mHeart.update(this.mCatherine.getXform());
    if (color1[3] > 0)
    {
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
        if (this.mHero.getXform().getYPos() > 15)
            this.mHero.update(this.mAllPlatforms);
    }
    else
        return true;    
    return false;
};
