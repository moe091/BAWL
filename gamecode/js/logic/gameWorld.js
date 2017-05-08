BAWL.gameWorld = {}
BAWL.gameWorld.chars = [];

BAWL.gameWorld.addChar = function(char) {
    this.chars.push(char);
    
    this.playerCollide = game.add.group();
}