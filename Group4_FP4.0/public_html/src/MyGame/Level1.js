/*
 * File: Level1.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level1() {    
    this.sceneFile = "assets/Scenes/Level1.json";    
}
gEngine.Core.inheritPrototype(Level1, MyGame);

Level1.prototype.initialize0 = function () {
    this.thisLevel = new Level1();
    this.nextLevel = new Level2(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
};

Level1.prototype.showAnimationWin = function(){
    var delta =0.01;
    var color1 = this.mTexts.getObjectAt(1).getColor();
    
    this.mHeart.update(this.mCatherine.getXform());
    if (color1[3] > 0){
        color1[3] -= delta;
        this.mTexts.getObjectAt(1).setColor(color1);
    }
    else {
        return true;
    }
    
    return false;
};