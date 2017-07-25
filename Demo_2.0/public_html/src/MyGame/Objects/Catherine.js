/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global GameObject, gEngine */

function Catherine(spriteTexture, xPos, yPos) {
    this.mActress = new SpriteRenderable(spriteTexture);
    this.mActress.setColor([1, 1, 1, 0]);
    this.mActress.getXform().setPosition(xPos, yPos);
    this.mActress.getXform().setSize(4, 10);
    this.mActress.setElementPixelPositions(0, this.mActress.getTextureWidth(), 0, this.mActress.getTextureHeight());
    
    GameObject.call(this, this.mActress);
    var r = new RigidRectangle(this.getXform(), this.mActress.getXform().getWidth(), this.mActress.getXform().getHeight());
    r.setMass(0.5);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
}

gEngine.Core.inheritPrototype(Catherine, GameObject);

Catherine.prototype.chaseHero = function (hero, triggerDis, chaseSpeed) {
    var heroPos = hero.getXform().getPosition();
    var thisPos = this.getXform().getPosition();
    var distance = Math.sqrt((Math.pow((heroPos[0] - thisPos[0]), 2) + Math.pow((heroPos[1] - thisPos[1]), 2)));

    if(distance <= triggerDis && distance > 5) {
        this.moveTowards_H(hero, chaseSpeed);
    }
};

Catherine.prototype.update = function() {
  GameObject.prototype.update.call(this);
};