BAWL.gameWorld = {}
BAWL.gameWorld.chars = [];

BAWL.gameWorld.addChar = function(name, x, y) {
    c = new BAWL.Char(game.add.sprite(x, y, name))
    this.chars.push(c);
    return c;
}