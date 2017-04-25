BAWL.Player = function(assetName, x, y) {
    this.sprites = [];
    
    this.lFoot = game.add.sprite(x - 9, y - 16, assetName + '_foot');
    this.lFoot.anchor.setTo(0.5);
    this.lFoot.offset = new Phaser.Point(-6, -11);
    this.sprites.push(this.lFoot);
    
    this.rFoot = game.add.sprite(x + 9, y + 19, assetName + '_foot');
    this.rFoot.anchor.setTo(0.5);
    this.rFoot.offset = new Phaser.Point(6, 13);
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
    this.lHand.offset = new Phaser.Point(-35, -9);
    this.lHand.rotation = Math.PI * -0.25;
    this.lHand.scale.setTo(1.4);
    this.sprites.push(this.lHand);
    
    this.rHand = game.add.sprite(x + 45, y - 14, assetName + '_hand');
    this.rHand.anchor.setTo(0.5);
    this.rHand.offset = new Phaser.Point(35, -9);
    this.rHand.scale.x = -1.4;
    this.rHand.scale.y = 1.4;
    this.rHand.rotation = Math.PI * 0.25;
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
    console.log(this.head);
    this.head.body.velocity = 0;
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].scale.x*= 0.55;
        this.sprites[i].scale.y*= 0.55;
    }
   
    //if collision breaks, use this for body.velocity
    this.vel = new Phaser.Point(0, 0);
    
    
}



BAWL.Player.prototype.update = function() {
    this.head.body.velocity = this.vel;
    this.head.rotation = game.physics.arcade.angleToPointer(this.head) + Math.PI / 2;
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].rotation = this.head.rotation;
        Math.tan(this.head.rotation)
        this.sprites[i].x = this.head.x + Math.sin(this.head.rotation) * -this.sprites[i].offset.y + Math.cos(this.head.rotation) * this.sprites[i].offset.x;
        this.sprites[i].y = this.head.y + Math.cos(this.head.rotation) * this.sprites[i].offset.y + Math.sin(this.head.rotation) * this.sprites[i].offset.x;
    }
    
        console.log((this.head.rotation));
    this.lHand.rotation-= Math.PI / 4;
    this.rHand.rotation+= Math.PI / 4;
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
    this.head.body.angularVelocity = val;
}
BAWL.Player.prototype.moveLeft = function(val) {
    this.head.body.angularVelocity = -val;
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

