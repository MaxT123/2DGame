/*
 * File: Level4.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level4() {    
    this.sceneFile = "assets/Scenes/Level4.json";    
}
gEngine.Core.inheritPrototype(Level4, MyGame);

Level4.prototype.initialize0 = function () {
    this.thisLevel = new Level4();
    this.nextLevel = new LevelFinal(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
};

Level4.prototype.showAnimationWin = function(){
    this.mHeart.update(this.mCatherine.getXform());
    return this.mHeart.getUpdateResult();
};
