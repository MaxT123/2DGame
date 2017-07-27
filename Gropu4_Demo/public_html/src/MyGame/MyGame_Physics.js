/*
 * File: MyGame_Physics.js 
 * Relaxation support for behaviors
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, CollisionInfo, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype._physicsSimulation = function() {
    
    // Hero platform
    gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mHero, this.mAllWalls);
    //gEngine.Physics.processObjSet(this.mHero, this.mAllHumans);
    
    //  Humans
    gEngine.Physics.processObjSet(this.mCatherine, this.mAllPlatforms);
    //gEngine.Physics.processObjSet(this.mCatherine, this.mAllHumans);
    
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllPlatforms);
    gEngine.Physics.processSetSet(this.mAllHumans, this.mAllHumans);
    
    // DyePack platform
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);
    gEngine.Particle.processSetSet(this.mAllPlatforms, this.mAllParticles);
};
