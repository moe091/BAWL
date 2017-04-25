BAWL.play = {
    preload: function() {
        
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.advancedTiming = true;
        
        this.loadMap();
        this.createWASD();
        
        this.player = new BAWL.Player('char1', 1500, 1800);
        game.camera.follow(this.player.head);
        
    },
    
    update: function() {
        this.player.setZeroVelocity();

        if (this.wasd.up.isDown) {
            this.player.moveUp(450);
            //this.player.head.body.velocity = new Phaser.Point(0, -300);
        } else if (this.wasd.down.isDown) {
            this.player.moveDown(450);
        }

        if (this.wasd.left.isDown) {
            if (this.wasd.up.isDown) {
                this.player.moveUpLeft(450);
            } else if (this.wasd.down.isDown) {
                this.player.moveDownLeft(450);
            } else {
                this.player.moveLeft(450);
            }
            
        } else if (this.wasd.right.isDown) {
            if (this.wasd.up.isDown) {
                this.player.moveUpRight(450);
            } else if (this.wasd.down.isDown) {
                this.player.moveDownRight(450);
            } else {
                this.player.moveRight(450);
            }
        } else {
            this.player.head.body.angularVelocity = 0;
        }
        this.player.update();
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
    },
    
    createWASD: function() {
        this.wasd = {
          up: game.input.keyboard.addKey(Phaser.Keyboard.W),
          down: game.input.keyboard.addKey(Phaser.Keyboard.S),
          left: game.input.keyboard.addKey(Phaser.Keyboard.A),
          right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
    }
    
}
