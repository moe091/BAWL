BAWL = {}
BAWL.load = {
    preload: function() {
        this.loadChar();
        this.loadSpells();
        this.loadWeapons();
        this.loadEnemies();
        game.load.tilemap('testmap', '../../maps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('hyp1', '../../maps/hyp1.png');
        game.load.image('hyp2', '../../maps/hyp2.png');
        game.load.image('hyp3', '../../maps/hyp3.png');
    },
    create: function() {
        
        
        game.state.start('play');
    },

    
    loadChar: function() {
        game.load.image('char1_head', '../../assets/chars/char1_s_head.png');
        game.load.image('char1_shoulder', '../../assets/chars/char1_s_shoulder.png');
        game.load.image('char1_elbow', '../../assets/chars/char1_s_elbow.png');
        game.load.image('char1_hand', '../../assets/chars/char1_s_hand.png');
        game.load.image('char1_bod', '../../assets/chars/char1_s_bod.png');
        game.load.image('char1_foot', '../../assets/chars/char1_s_foot.png');
    },
    
    loadSpells: function() {
        game.load.spritesheet('icewall', '../../assets/spells/icewall.png', 193, 45);
        game.load.image('lunge', '../../assets/spells/lunge.png');
    },
    
    loadWeapons: function() {
        game.load.image('sword1', '../../assets/weapons/sword1.png');
    },
    
    loadEnemies: function() {
        game.load.spritesheet('ogre1', '../../assets/enemies/ogre1.png', 128, 128);
    }
    

    
}






























