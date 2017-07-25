/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global GameObject, gEngine, Catherine */

function Human(spriteTexture, xPos, yPos) {
    Catherine.call(this, spriteTexture, xPos, yPos);
}
gEngine.Core.inheritPrototype(Human, Catherine);
