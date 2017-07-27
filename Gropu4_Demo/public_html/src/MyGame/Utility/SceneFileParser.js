/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global gEngine */

function SceneFileParser(sceneFilePath) {
    this.mScene = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype.getCameras = function(cameras) {
    for(var i = 0; i < this.mScene.Camera.length; i++) {
        var cx = this.mScene.Camera[i].Center[0];
        var cy = this.mScene.Camera[i].Center[1];
        var camWidth = this.mScene.Camera[i].Width;

        var viewport = [];
        var bgColor = [];
        for(var j = 0; j < 4; j++) {
            viewport[j] = this.mScene.Camera[i].Viewport[j];
            bgColor[j] = this.mScene.Camera[i].BgColor[j];
        }
        var cam = new Camera(
            vec2.fromValues(cx, cy),  // position of the camera
            camWidth,                        // width of camera
            viewport                  // viewport (orgX, orgY, width, height)
            );
        cam.setBackgroundColor(bgColor);
        cameras.push(cam);
    }
    return cameras;
};

SceneFileParser.prototype.getPlatforms = function (platforms) {
    for(var i = 0; i < this.mScene.Platforms.length; i++){
        var platformAttr = [];
        
        var platformPos = this.mScene.Platforms[i].Position;
        var platformScale = this.mScene.Platforms[i].Scale;
        platformAttr = [platformPos[0], platformPos[1], platformScale[0], platformScale[1]];
        platforms.push(platformAttr);
    }
    return platforms;
};
SceneFileParser.prototype.getWalls = function (walls) {
    for(var i = 0; i < this.mScene.Walls.length; i++){
        var wallAttr = [];
        
        var wallPos = this.mScene.Walls[i].Position;
        var wallScale = this.mScene.Walls[i].Scale;
        wallAttr = [wallPos[0], wallPos[1], wallScale[0], wallScale[1]];
        walls.push(wallAttr);
    }
    return walls;
};
SceneFileParser.prototype.getTexts = function (texts) {
    if(this.mScene.Texts.length === 0) {
        return null;
    }
    
    for(var i = 0; i < this.mScene.Texts.length; i++) {
        var textAttr = [];
        var textContent = this.mScene.Texts[i].Content;
        var textPos = this.mScene.Texts[i].Position;
        var textColor = this.mScene.Texts[i].Color;
        var textHeight = this.mScene.Texts[i].Height;

        textAttr = [textContent, textPos[0], textPos[1], textColor, textHeight];
        texts.push(textAttr);
    }
    return texts;
};
SceneFileParser.prototype.getStatus = function () {
    return this.mScene.GameStatus.DefaultStatus;
};

SceneFileParser.prototype.getHeroAttr = function() {
    var heroAttr = [];
    var heroPos = this.mScene.Hero.Position;
    var heroScale = this.mScene.Hero.Scale;
    var heroMoveSpeed = this.mScene.Hero.MoveSpeed;
    var heroJumpSpeed = this.mScene.Hero.JumpSpeed;
    
    heroAttr = [heroPos[0], heroPos[1], heroScale[0], heroScale[1], heroMoveSpeed, heroJumpSpeed];
    return heroAttr;
};
SceneFileParser.prototype.getCatherineAttr = function() {
    var caAttr = [];
    var caPos = this.mScene.Catherine.Position;
    var caScale = this.mScene.Catherine.Scale;
    var caSpeed = this.mScene.Catherine.Speed;
    var caTriDis = this.mScene.Catherine.TriggerDistance;
    caAttr = [caPos[0], caPos[1], caScale[0], caScale[1], caSpeed, caTriDis];
    return caAttr;
};

SceneFileParser.prototype.getHumansAttr = function(humansAttr) {
    if(this.mScene.Humans !== null) {
        for(var i = 0; i < this.mScene.Humans.length; i++){
            var humanAttr = [];

            var humanPos = this.mScene.Humans[i].Position;
            var humanScale = this.mScene.Humans[i].Scale;
            var humanSpeed = this.mScene.Humans[i].Speed;
            var humanTriDis = this.mScene.Humans[i].TriggerDistance;
            humanAttr = [humanPos[0], humanPos[1], humanScale[0], humanScale[1], humanSpeed, humanTriDis];
            humansAttr.push(humanAttr);
        }
        return humansAttr;
    }
    else {
        return null;
    }
};
SceneFileParser.prototype.getFlowerAttr = function() {
    var flowerAttr = [];
    var flowerPos = this.mScene.Flower.Position;
    var flowerScale = this.mScene.Flower.Scale;
    
    flowerAttr = [flowerPos[0], flowerPos[1], flowerScale[0], flowerScale[1]];
    return flowerAttr;
};
