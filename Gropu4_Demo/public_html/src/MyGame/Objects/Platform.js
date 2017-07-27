<<<<<<< HEAD
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

function Platform(texture, atX, atY) {

function Platform(texture, atX, atY, width, height, collider) {
>>>>>>> ac41942d15854849565fa4819166cf390c5b251c
    this.mPlatform = new TextureRenderable(texture);
//    alert(this.mHero);
    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setSize(30, 3.75);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

    var rigidShape = new RigidRectangle(this.getXform(), 30, 3);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 0]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Platform, GameObject);
=======
/* File: Platform.js 
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Platform(texture, atX, atY) {
    this.mPlatform = new TextureRenderable(texture);
//    alert(this.mHero);
    this.mPlatform.setColor([1, 1, 1, 0]);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setSize(30, 3.75);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

    var rigidShape = new RigidRectangle(this.getXform(), 30, 3);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 0.2, 0.2, 0]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Platform, GameObject);
>>>>>>> e5a261f92045a9cc8956104ec861b513e9afad36
