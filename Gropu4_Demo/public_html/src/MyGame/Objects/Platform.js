/* File: Platform.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

<<<<<<< HEAD
function Platform(texture, atX, atY) {
=======
function Platform(texture, atX, atY, width, height, collider) {
>>>>>>> b3b316425c805377ee207fd0e3f319334f625752
    this.mPlatform = new TextureRenderable(texture);
//    alert(this.mHero);
    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setSize(width, height);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

    var rigidShape = new RigidRectangle(this.getXform(), width, height);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Platform, GameObject);
