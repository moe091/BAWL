BAWL.play = {
    preload: function() {
        
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.time.advancedTiming = true;
        
        this.loadMap();
        this.createWASD();
        AnimationEditor.createWASD(); //NOTE - EDITOR CODE
        
        this.player = new BAWL.Player('char1', 1500, 1800);
        BAWL.gameWorld.addChar(this.player);
        game.camera.follow(this.player.head);
        
        game.world.children.map
        
    },
    
    update: function() {
        this.player.setZeroVelocity();
        
        if (!AnimationEditor.paused) {
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

            if (this.wasd.f.isDown) {
                if (this.player.punching == false) {

                    this.player.doAnimation(1);
                }
            } else if (this.wasd.ONE.isDown) {
                if (this.player.punching == false) {
                    this.player.doAnimation(2);
                }
            } else if (this.wasd.TWO.isDown) {
                if (this.player.punching == false) {
                    this.player.doAnimation(3);
                }
            }
        } else {
            AnimationEditor.update(); //NOTE - EDITOR CODE
        }
        
        //game.physics.arcade.collide(this.player.head, BAWL.gameWorld.playerCollide, this.playerCollision, this.processHandler, this);
        this.player.update();
        
         
    },
    
    playerCollision: function(p, g) {
        console.log("COLLIDE");
        p.body.velocity.setTo(0);
        this.player.bod.body.velocity.setTo(0);
    },
        
    processHandler: function(p, g) {
        console.log("PROCESS");
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
            f: game.input.keyboard.addKey(Phaser.Keyboard.F),
            ONE: game.input.keyboard.addKey(Phaser.Keyboard.ONE),
            TWO: game.input.keyboard.addKey(Phaser.Keyboard.TWO),
            THREE: game.input.keyboard.addKey(Phaser.Keyboard.THREE),
            FOUR: game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
            FIVE: game.input.keyboard.addKey(Phaser.Keyboard.FIVE),
        };
    }
    
}
