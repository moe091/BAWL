BAWL.Player = function(assetName, x, y) {
    this.sprites = [];
    
    this.lFoot = game.add.sprite(x - 9, y - 16, assetName + '_foot');
    this.lFoot.anchor.setTo(0.5);
    this.lFoot.offset = new Phaser.Point(-6, 0);
    this.sprites.push(this.lFoot);
    
    this.rFoot = game.add.sprite(x + 9, y + 19, assetName + '_foot');
    this.rFoot.anchor.setTo(0.5);
    this.rFoot.offset = new Phaser.Point(6, 0);
    this.rFoot.scale.x = -1;
    this.sprites.push(this.rFoot);
    
    this.bod = game.add.sprite(x, y + 5, assetName + '_bod');
    this.bod.anchor.setTo(0.5);
    this.bod.offset = new Phaser.Point(0, 3);
    this.sprites.push(this.bod);
    
    this.lShoulder = game.add.sprite(x - 28, y, assetName + '_shoulder');
    this.lShoulder.anchor.setTo(0.5);
    this.lShoulder.offset = new Phaser.Point(-18, 0);
    this.sprites.push(this.lShoulder);
    
    this.rShoulder = game.add.sprite(x + 18, y, assetName + '_shoulder');
    this.rShoulder.anchor.setTo(0.5);
    this.rShoulder.offset = new Phaser.Point(18, 0);
    this.rShoulder.scale.x = -1;
    this.sprites.push(this.rShoulder);
    
    this.lHand = game.add.sprite(x - 45, y - 14, assetName + '_hand');
    this.lHand.anchor.setTo(0.5);
    this.lHand.offset = new Phaser.Point(-38, -9);
    this.lHand.offset.rotation = -Math.PI / 4;
    this.lHand.scale.setTo(1.4);
    this.sprites.push(this.lHand);
    
    this.rHand = game.add.sprite(x + 45, y - 14, assetName + '_hand');
    this.rHand.anchor.setTo(0.5);
    this.rHand.offset = new Phaser.Point(38, -9);
    this.rHand.offset.rotation = Math.PI / 4;
    this.rHand.scale.x = -1.4;
    this.rHand.scale.y = 1.4;
    this.sprites.push(this.rHand);
    
    this.lElbow = game.add.sprite(x - 35, y - 10, assetName + '_elbow');
    this.lElbow.offset = new Phaser.Point(-27, -2);
    this.lElbow.anchor.setTo(0.5);
    this.sprites.push(this.lElbow);
    
    this.rElbow = game.add.sprite(x + 35, y - 10, assetName + '_elbow');
    this.rElbow.offset = new Phaser.Point(27, -2);
    this.rElbow.anchor.setTo(0.5);
    this.rElbow.scale.x = -1;
    this.sprites.push(this.rElbow);

    this.head = game.add.sprite(x, y, assetName + '_head');
    this.head.anchor.setTo(0.5); 
    this.head.offset = new Phaser.Point(0, 0);
    this.head.scale.setTo(0.55, 0.55);
    game.physics.arcade.enable(this.head);
    this.head.body.velocity = 0;
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].scale.x*= 0.55;
        this.sprites[i].scale.y*= 0.55;
        if (this.sprites[i].offset.rotation == null)
            this.sprites[i].offset.rotation = 0;
        game.physics.arcade.enable(this.sprites[i]);
    }
   
    //if collision breaks, use this for body.velocity
    this.vel = new Phaser.Point(0, 0);
    
    this.setupAni();
}

//Eventually load these from json file
BAWL.Player.prototype.setupAni = function() {

    
    this.bod.movement = new BAWL.MovePath(this.head, this.bod);
    this.bod.movement.addPos(0, 3, 300, -Math.PI / 16);
    this.bod.movement.addPos(0, 3, 600, Math.PI / 16);
    this.bod.movement.addPos(0, 3, 300, 0);
    this.bod.movement.start();
    
    this.rShoulder.movement = new BAWL.MovePath(this.head, this.rShoulder);
    this.rShoulder.movement.addPos(17, -4, 300, -Math.PI / 32);
    this.rShoulder.movement.addPos(18, 0, 300, 0);
    this.rShoulder.movement.addPos(17, 4, 300, -Math.PI / 32);
    this.rShoulder.movement.addPos(18, 0, 300, 0);
    this.rShoulder.movement.start();
    
    this.lShoulder.movement = new BAWL.MovePath(this.head, this.lShoulder);
    this.lShoulder.movement.addPos(-17, 4, 300, -Math.PI / 32);
    this.lShoulder.movement.addPos(-18, 0, 300, 0);
    this.lShoulder.movement.addPos(-17, -4, 300, -Math.PI / 32);
    this.lShoulder.movement.addPos(-18, 0, 300, 0);
    this.lShoulder.movement.start();
    
    this.lElbow.movement = new BAWL.MovePath(this.head, this.lElbow);
    this.lElbow.movement.addPos(-25, 3, 300);
    this.lElbow.movement.addPos(-27, -2, 300);
    this.lElbow.movement.addPos(-25, -5, 300);
    this.lElbow.movement.addPos(-27, -2, 300);
    this.lElbow.movement.start();
    
    this.rElbow.movement = new BAWL.MovePath(this.head, this.rElbow);
    this.rElbow.movement.addPos(25, -6, 300);
    this.rElbow.movement.addPos(27, -2, 300);
    this.rElbow.movement.addPos(25, 2, 300);
    this.rElbow.movement.addPos(27, -2, 300);
    this.rElbow.movement.start();
    
    this.lHand.movement = new BAWL.MovePath(this.head, this.lHand);
    this.lHand.movement.addPos(-35, 1, 300, -Math.PI / 3);
    this.lHand.movement.addPos(-38, -9, 300, -Math.PI / 6);
    this.lHand.movement.addPos(-32, -13, 300, -Math.PI / 10);
    this.lHand.movement.addPos(-38, -9, 300, -Math.PI / 4);
    this.lHand.movement.start();
    
    this.rHand.movement = new BAWL.MovePath(this.head, this.rHand);
    this.rHand.movement.addPos(35, -13, 300, Math.PI / 10);
    this.rHand.movement.addPos(38, -9, 300, Math.PI / 6);
    this.rHand.movement.addPos(33, 1, 300, Math.PI / 3);
    this.rHand.movement.addPos(38, -9, 300, Math.PI / 4);
    this.rHand.movement.start();
    
    this.rFoot.movement = new BAWL.MovePath(this.head, this.rFoot);
    this.rFoot.movement.addPos(6, 12, 300);
    this.rFoot.movement.addPos(6, 0, 300);
    this.rFoot.movement.addPos(6, -12, 300);
    this.rFoot.movement.addPos(6, 0, 300);
    this.rFoot.movement.start();
    
    this.lFoot.movement = new BAWL.MovePath(this.head, this.lFoot);
    this.lFoot.movement.addPos(-6, -12, 300);
    this.lFoot.movement.addPos(-6, 0, 300);
    this.lFoot.movement.addPos(-6, 12, 300);
    this.lFoot.movement.addPos(-6, 0, 300);
    this.lFoot.movement.start();

}




BAWL.Player.prototype.update = function() {
    this.head.body.velocity = this.vel;
    this.head.rotation = game.physics.arcade.angleToPointer(this.head) + Math.PI / 2;
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].rotation = this.head.rotation + this.sprites[i].offset.rotation;
        Math.tan(this.head.rotation)
        this.sprites[i].x = this.head.x + Math.sin(this.head.rotation) * -this.sprites[i].offset.y + Math.cos(this.head.rotation) * this.sprites[i].offset.x;
        this.sprites[i].y = this.head.y + Math.cos(this.head.rotation) * this.sprites[i].offset.y + Math.sin(this.head.rotation) * this.sprites[i].offset.x;
        if (this.sprites[i].movement != null) {
            this.sprites[i].movement.update();
        }
        this.sprites[i].body.velocity = this.vel;
    }
    console.log(this.lHand.movement.step);
    //this.lHand.rotation-= Math.PI / 4;
    //this.rHand.rotation+= Math.PI / 4;
}
//___________________________MOTION____________________________\\
BAWL.Player.prototype.setZeroVelocity = function() {
    this.vel.setTo(0, 0);
}


BAWL.Player.prototype.moveUp = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle - 90, val, this.vel);
}
BAWL.Player.prototype.moveDown = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle - 90, -val, this.vel);
}
BAWL.Player.prototype.moveRight = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle - 180, -val, this.vel)
}
BAWL.Player.prototype.moveLeft = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle, -val, this.vel)
}

BAWL.Player.prototype.moveUpLeft = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle + 45, -val, this.vel);
}
BAWL.Player.prototype.moveDownLeft = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle - 45, -val, this.vel);
}
BAWL.Player.prototype.moveUpRight = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle - 45, val, this.vel)
}
BAWL.Player.prototype.moveDownRight = function(val) {
    game.physics.arcade.velocityFromAngle(this.head.angle - 135, -val, this.vel)
}














/**
BAWL.player = function(pMake) {
    this.head = pMake.head;
    this.lShoulder = pMaker.shoulder;
    this.lElbow = pMaker.elbow;
    this.lHand = pMaker.hand;
    this.body = pMake.body;
    this.lFoot = pMake.foot;
}
**/

