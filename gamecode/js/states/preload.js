BAWL = {}
BAWL.Load = {
    preload: function() {
        game.load.image('logo', 'phaser-ce/phaser-logo-small.png');
        this.loadChar();
        game.load.tilemap('testmap', '../../maps/testmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('hyp1', '../../maps/hyp1.png');
        game.load.image('hyp2', '../../maps/hyp2.png');
        game.load.image('hyp3', '../../maps/hyp3.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.loadMap();
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
        
        BAWL.player = new BAWL.Player('char1', 1500, 1800);
        game.camera.follow(BAWL.player.head);
        
        cursors = game.input.keyboard.createCursorKeys();
        game.physics.enable(BAWL.player.head, Phaser.Physics.ARCADE);
    },
    update: function() {
       // BAWL.player.head.x+= 1;
        BAWL.player.setZeroVelocity();

        if (cursors.up.isDown)
        {
            BAWL.player.moveUp(300);
            //BAWL.player.head.body.velocity = new Phaser.Point(0, -300);
        }
        else if (cursors.down.isDown)
        {
            BAWL.player.moveDown(300);
        }

        if (cursors.left.isDown)
        {
            BAWL.player.moveLeft(300);
        }
        else if (cursors.right.isDown)
        {
            BAWL.player.moveRight(300);
        } else {
            BAWL.player.head.body.angularVelocity = 0;
        }
        BAWL.player.update();
    },
    
    loadChar: function() {
        game.load.image('char1_head', '../../assets/chars/char1_head.png');
        game.load.image('char1_shoulder', '../../assets/chars/char1_shoulder.png');
        game.load.image('char1_elbow', '../../assets/chars/char1_elbow.png');
        game.load.image('char1_hand', '../../assets/chars/char1_hand.png');
        game.load.image('char1_bod', '../../assets/chars/char1_bod.png');
        game.load.image('char1_foot', '../../assets/chars/char1_foot.png');
    },
    
    loadMap: function() {
        
        
        BAWL.map = game.add.tilemap('testmap');

        BAWL.map.addTilesetImage('hyp-1', 'hyp1');
        BAWL.map.addTilesetImage('hyp2', 'hyp2');
        BAWL.map.addTilesetImage('hyp3', 'hyp3');
        
        
        var l1 = BAWL.map.createLayer('l1');
        var l2 = BAWL.map.createLayer('l2');
        l1.scale.set(1.5);
        l1.resizeWorld();
    
    }
    
}






























