/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function GameState() {
    this.gameStatus = 0;
}

GameState.eGameStatus = Object.freeze({
    ePlaying: 0,
    eLose: 1,
    eWin:2
});

GameState.prototype.getGameStatus = function() {
    return this.gameStatus;
};

GameState.prototype.setGameStatus = function(flag) {
    if(flag === 0) {
        this.gameStatus = GameState.eGameStatus.ePlaying;
    } else if (flag === 1) {
        this.gameStatus = GameState.eGameStatus.eLose;
    } else if (flag === 2) {
        this.gameStatus = GameState.eGameStatus.eWin;
    }
};