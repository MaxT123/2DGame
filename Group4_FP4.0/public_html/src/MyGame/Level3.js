/*
 * File: Level3.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Level3() {    
    this.sceneFile = "assets/Scenes/Level3.json";    
}
gEngine.Core.inheritPrototype(Level3, MyGame);

Level3.prototype.initialize0 = function () {
    this.thisLevel = new Level3();
    this.nextLevel = new LevelFinal(); 
    this.sceneParser = new SceneFileParser(this.sceneFile);    
};

Level3.prototype.showAnimationWin = function(){
    this.mHeart.update(this.mCatherine.getXform());
    return this.mHeart.getUpdateResult();
};
