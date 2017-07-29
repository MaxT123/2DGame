/* File: Wall.js 
 *
 * Creates and initializes a Wall object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Flower(texture, atX, atY, width, height) {
    this.mFlower = new TextureRenderable(texture);

    this.mFlower.setColor([1, 1, 1, 0]);
    this.mFlower.getXform().setPosition(atX, atY);
    this.mFlower.getXform().setSize(width, height);
    
    this.ifTouchCatherine = false;
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mFlower);
/*
    var rigidShape = new RigidRectangle(this.getXform(), 5, 16);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([1, 1, 1, 1]);
    this.setPhysicsComponent(rigidShape);
    */
}
gEngine.Core.inheritPrototype(Flower, GameObject);

Flower.prototype.update = function (posCather) 
{
    var xform = this.mFlower.getXform();
    var leftBorder = xform.getXPos() - xform.getWidth() / 2;
    var rightBorder = xform.getXPos() + xform.getWidth() / 2;
    var topBorder = xform.getYPos() + xform.getHeight() / 2;
    var bottomBorder = xform.getYPos() - xform.getHeight() / 2;
    if (leftBorder <= posCather[0] && posCather[0] <= rightBorder)
        if (bottomBorder <= posCather[1] && posCather[1] <= topBorder)
            this.ifTouchCatherine = true;
};

Flower.prototype.getTouchCatherineResult = function() {
    return this.ifTouchCatherine;
};
