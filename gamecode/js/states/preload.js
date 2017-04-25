BAWL = {}
BAWL.load = {
    preload: function() {
        this.loadChar();
        game.load.tilemap('testmap', '../../maps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('hyp1', '../../maps/hyp1.png');
        game.load.image('hyp2', '../../maps/hyp2.png');
        game.load.image('hyp3', '../../maps/hyp3.png');
    },
    create: function() {
        
        
        game.state.start('play');
    },

    
    loadChar: function() {
        game.load.image('char1_head', '../../assets/chars/char1_head.png');
        game.load.image('char1_shoulder', '../../assets/chars/char1_shoulder.png');
        game.load.image('char1_elbow', '../../assets/chars/char1_elbow.png');
        game.load.image('char1_hand', '../../assets/chars/char1_hand.png');
        game.load.image('char1_bod', '../../assets/chars/char1_bod.png');
        game.load.image('char1_foot', '../../assets/chars/char1_foot.png');
    }
    

    
}






























