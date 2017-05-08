//TODO: load player info from file instead of hardcoding
//right now a single player type is hardcoded in. later different types will be added and saved in JSON files to be parsed by the Player object upon creation

BAWL.Player = function(assetName, x, y) {
    this.createBodyParts(assetName, x, y);
    this.head.body.fixedRotation = true;
    
    this.moveKeys = {};
    this.movements = [];
    this.curMovement;
    this.lastMovement;
    this.punching = false;
    //this.loadAnimation();
    
    this.name = "Player";
    BAWL.loader.loadAnimation("player", "newRun", this.loadAnimation, this);
    BAWL.loader.loadAnimation("player", "punch1", this.loadAnimation, this);
    BAWL.loader.loadAnimation("player", "whirlwind", this.loadAnimation, this);
    BAWL.loader.loadAnimation("player", "icewall", this.loadAnimation, this);
    this.curMovement = this.movements[0];
}


//________________________________________ACTIONS________________________________\\
BAWL.Player.prototype.doCast = function(name) {
    if (name == "icewall") {
        BAWL.spells.icewall(this);
    }
}


BAWL.Player.prototype.doAnimation = function(n) {
    this.lastMovement = this.curMovement;
    this.curMovement = this.movements[n];
    this.curMovement.start();
    this.punching = true; //TEMP - for testing
}




//_____________________________________UPDATE________________________________________\\

BAWL.Player.prototype.update = function() {
    this.head.body.rotation = game.physics.arcade.angleToPointer(this.head) + Math.PI / 2; //rotate head to face cursor. All body positions/rotations are based off head 
    this.head.rotation = this.head.body.rotation;
    this.updateRotation();
    
    for (var i = 0; i < this.parts.children.length; i++) {
        //update body parts relative to head based on their position/rotation offsets(updated by movement paths)
        this.parts.children[i].rotation = this.head.rotation + this.parts.children[i].offset.rotation;
        this.parts.children[i].x = this.head.x + Math.sin(this.head.rotation) * -this.parts.children[i].offset.y + Math.cos(this.head.rotation) * this.parts.children[i].offset.x;
        this.parts.children[i].y = this.head.y + Math.cos(this.head.rotation) * this.parts.children[i].offset.y + Math.sin(this.head.rotation) * this.parts.children[i].offset.x;

        //update movement paths for all body parts that have one
        if (this.parts.children[i].movement != null) {

        }

        this.parts.children[i].body.velocity = this.head.body.velocity; //set body part velocities to head vel, otherwise heads position is ahead of body parts by 1 frame when rendered.    
    }
    
    if (this.punching || this.moving) {
        this.curMovement.update();
    }
   
},
    
BAWL.Player.prototype.updateRotation = function() {
    
}
    
    
    

BAWL.Player.prototype.changePos = function(tStep) {
    if (false) {
        for (var j = 0; j < tStep.positions.length; j++) {
            tStep.positions[j].sprite.offset.x = tStep.positions[j].x;
            tStep.positions[j].sprite.offset.y = tStep.positions[j].y;
            tStep.positions[j].sprite.offset.rotation = tStep.positions[j].rotation;
        }
        for (var i = 0; i < this.parts.children.length; i++) {
            this.parts.children[i].rotation = this.head.rotation + this.parts.children[i].offset.rotation;
            this.parts.children[i].x = this.head.x + Math.sin(this.head.rotation) * -this.parts.children[i].offset.y + Math.cos(this.head.rotation) * this.parts.children[i].offset.x;
            this.parts.children[i].y = this.head.y + Math.cos(this.head.rotation) * this.parts.children[i].offset.y + Math.sin(this.head.rotation) * this.parts.children[i].offset.x;
        }
    }
}








//___________________________MOTION____________________________\\
BAWL.Player.prototype.setZeroVelocity = function() {
    //this.head.body.velocity.setTo(0, 0);
    this.head.body.setZeroVelocity();
    this.moving = false;
}


BAWL.Player.prototype.moveUp = function(val) {
    //game.physics.arcade.velocityFromAngle(this.head.angle - 90, val, this.head.body.velocity);
    this.head.body.velocity.y = Math.sin(this.head.rotation - (Math.PI / 2)) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation - (Math.PI / 2)) * val;
    this.moving = true;
}
BAWL.Player.prototype.moveDown = function(val) {
    val = -val;
    this.head.body.velocity.y = Math.sin(this.head.rotation - (Math.PI / 2)) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation - (Math.PI / 2)) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle - 90, -val, this.head.body.velocity);
    this.moving = true;
}
BAWL.Player.prototype.moveRight = function(val) {
    this.head.body.velocity.y = Math.sin(this.head.rotation) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle - 180, -val, this.head.body.velocity);
    this.moving = true;
}
BAWL.Player.prototype.moveLeft = function(val) {
    val = -val;
    this.head.body.velocity.y = Math.sin(this.head.rotation) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle, -val, this.head.body.velocity);
    this.moving = true;
}

//diagonal directions need their own function because it's the simplest way to combine 2 directions while using arcade.velocityFromAngle()
BAWL.Player.prototype.moveUpLeft = function(val) {
    val = -val;
    this.head.body.velocity.y = Math.sin(this.head.rotation + (Math.PI / 4)) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation + (Math.PI / 4)) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle + 45, -val, this.head.body.velocity);
    this.moving = true;
}
BAWL.Player.prototype.moveDownLeft = function(val) {
    this.head.body.velocity.y = Math.sin(this.head.rotation - (Math.PI * 1.25)) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation - (Math.PI * 1.25)) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle - 45, -val, this.head.body.velocity);
    this.moving = true;
}
BAWL.Player.prototype.moveUpRight = function(val) {
    this.head.body.velocity.y = Math.sin(this.head.rotation - (Math.PI / 4)) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation - (Math.PI / 4)) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle - 45, val, this.head.body.velocity);
    this.moving = true;
}
BAWL.Player.prototype.moveDownRight = function(val) {
    this.head.body.velocity.y = Math.sin(this.head.rotation + (Math.PI / 4)) * val;
    this.head.body.velocity.x = Math.cos(this.head.rotation + (Math.PI / 4)) * val;
    //game.physics.arcade.velocityFromAngle(this.head.angle - 135, -val, this.head.body.velocity);
    this.moving = true;
}










//___________________________INITIALIZATION____________________________\\


//Create and initialize sprites that make up body parts
BAWL.Player.prototype.createBodyParts = function(assetName, x, y) {
    this.sprites = [];
    this.parts = game.add.group();
    
    this.lFoot = this.parts.create(x - 9, y - 16, assetName + '_foot');
    this.lFoot.name = "lFoot";
    this.lFoot.anchor.setTo(0.5);
    this.lFoot.offset = new Phaser.Point(-6, 0);
    this.sprites.push(this.lFoot);
    
    this.rFoot = this.parts.create(x + 9, y + 19, assetName + '_foot');
    this.rFoot.name = "rFoot";
    this.rFoot.anchor.setTo(0.5);
    this.rFoot.offset = new Phaser.Point(6, 0);
    this.rFoot.scale.x = -1;
    this.sprites.push(this.rFoot);
    
    this.bod = this.parts.create(x, y + 5, assetName + '_bod');
    this.bod.name = "bod";
    this.bod.anchor.setTo(0.5);
    this.bod.offset = new Phaser.Point(0, 3);
    this.sprites.push(this.bod);
    
    this.lShoulder = this.parts.create(x - 28, y, assetName + '_shoulder');
    this.lShoulder.name = "lShoulder";
    this.lShoulder.anchor.setTo(0.5);
    this.lShoulder.offset = new Phaser.Point(-18, 0);
    this.sprites.push(this.lShoulder);
    
    this.rShoulder = this.parts.create(x + 18, y, assetName + '_shoulder');
    this.rShoulder.name = "rShoulder";
    this.rShoulder.anchor.setTo(0.5);
    this.rShoulder.offset = new Phaser.Point(18, 0);
    this.rShoulder.scale.x = -1;
    this.sprites.push(this.rShoulder);
    
    this.lHand = this.parts.create(x - 45, y - 14, assetName + '_hand');
    this.lHand.name = "lHand";
    this.lHand.anchor.setTo(0.5);
    this.lHand.offset = new Phaser.Point(-38, -9);
    this.lHand.offset.rotation = -Math.PI / 4;
    this.lHand.scale.setTo(1.4);
    this.sprites.push(this.lHand);
    
    this.rHand = this.parts.create(x + 45, y - 14, assetName + '_hand');
    this.rHand.name = "rHand";
    this.rHand.anchor.setTo(0.5);
    this.rHand.offset = new Phaser.Point(38, -9);
    this.rHand.offset.rotation = Math.PI / 4;
    this.rHand.scale.x = -1.4;
    this.rHand.scale.y = 1.4;
    this.sprites.push(this.rHand);
    
    this.lElbow = this.parts.create(x - 35, y - 10, assetName + '_elbow');
    this.lElbow.name = "lElbow";
    this.lElbow.offset = new Phaser.Point(-27, -2);
    this.lElbow.anchor.setTo(0.5);
    this.sprites.push(this.lElbow);
    
    this.rElbow = this.parts.create(x + 35, y - 10, assetName + '_elbow');
    this.rElbow.name = "rElbow"
    this.rElbow.offset = new Phaser.Point(27, -2);
    this.rElbow.anchor.setTo(0.5);
    this.rElbow.scale.x = -1;
    this.sprites.push(this.rElbow);

    this.head = this.parts.create(x, y, assetName + '_head');
    this.head.name = "head";
    this.head.anchor.setTo(0.5); 
    this.head.offset = new Phaser.Point(0, 0);
    game.physics.p2.enable(this.head);

    for (i in this.parts.children) {
        this.parts.children[i].index = i;
    }
    
    this.parts.that = this;
    this.parts.forEach(function(part) {
        part.that = part.parent.that;
        if (part.offset.rotation == null) {
            part.offset.rotation = 0;
        }
        game.physics.arcade.enable(part);
    });
    
        
   
}


//Eventually load these from json file
//create animations by hand for now
//TODO: create an editor that either exports JSON or generates code to setup animations
BAWL.Player.prototype.loadAnimation = function(save, that, name) {
    save.name = name;
    var movement = new BAWL.Movement(that, save.name);
    for (var i in save.sprites) {
        movement.sprites[Number(that.getSpriteByName(save.sprites[i]).index)] = that.getSpriteByName(save.sprites[i]);
        movement.char = that;
    }
    for (var i in save.steps) {
        i = Number(i);
        if (save.steps[i].time == 250 || save.steps[i].time == 500) {
            //save.steps[i].time = save.steps[i].time / 2;
        }
        var step = new BAWL.step(save.steps[i].time, movement);
        
        for (var j in save.steps[i].positions) {
            if (save.steps[i].positions[j] == null) {
                save.steps[i].positions[j] = {};
                save.steps[i].positions[j].x = (save.steps[i+1].positions[j].x + save.steps[i-1].positions[j].x) / 2;
                save.steps[i].positions[j].y = (save.steps[i+1].positions[j].y + save.steps[i-1].positions[j].y) / 2;
                save.steps[i].positions[j].rotation = (save.steps[i+1].positions[j].rotation + save.steps[i-1].positions[j].rotation) / 2;
                save.steps[i].positions[j].spriteName = save.steps[i+1].positions[j].spriteName;
            }
            
            step.positions[j] = new Phaser.Point(save.steps[i].positions[j].x, save.steps[i].positions[j].y);
            step.positions[j].rotation = save.steps[i].positions[j].rotation;
            step.positions[j].sprite = that.getSpriteByName(save.steps[i].positions[j].spriteName);
        }
        
        movement.steps.push(step);
        
    }
    
    movement.steps.sort(function(a, b) {
        return a.time - b.time;
    });
    
    that.movements[that.movements.length] = movement;
    that.curMovement = that.movements[0];
    that.curMovement.start();
    
    if (that.movements.length >= 4) {
        that.movements[1].repeat = false;
        that.movements[2].repeat = false;
        that.movements[3].repeat = false;
        
        that.movements[3].steps[0].action = "icewall";
    }
    
    /**
    console.log(movepaths); // this will show the info it in firebug console
    
    that.movements[0] = new BAWL.Movement(that, "walk"); //this.moveKeys['walk'] = 0(index)
    
    for (mp in movepaths) {
        var s = that.getSpriteByName(movepaths[mp].spriteName);
        s.movement = new BAWL.MovePath(that.head, s, that.movements[0]);
        console.log("-------------" + movepaths[mp].spriteName + "-------------");
        for (pos in movepaths[mp].positions) {
            console.log("pos: " + movepaths[mp].positions[pos].index + ".  dur=" + movepaths[mp].positions[pos].duration + ",  time=" + movepaths[mp].positions[pos].time);
            s.movement.addPos(s, movepaths[mp].positions[pos].x, movepaths[mp].positions[pos].y, movepaths[mp].positions[pos].duration, movepaths[mp].positions[pos].rotation, movepaths[mp].positions[pos].time);
            if (that.movements[0].sprites[s.index] == null) {
                that.movements[0].sprites[s.index] = s;
            }
        }
        s.movement.start();
    }
    for (i in that.movements[0].sprites) {
        console.log(i + " - " + that.movements[0].sprites[i].name + " - " + that.movements[0].sprites[i].index);
    }
    that.movements[0].start();
    
    **/
},
    
BAWL.Player.prototype.getSpriteByName = function(n) {
    for (p in this.parts.children) {
        if (this.parts.children[p].name === n) {
            return this.parts.children[p];
        }
    }
    return null;
},
    
BAWL.Player.prototype.setupAni = function() {
    this.moveKeys["walk"] = 0;
    
    this.aniSpeed = 200;
    this.movements[0] = new BAWL.Movement(this, "walk"); //this.moveKeys['walk'] = 0(index)
    
    this.bod.movement = new BAWL.MovePath(this.head, this.bod, this.movements[this.moveKeys.walk]);
    this.bod.movement.addPos(this.bod, 0, 3, this.aniSpeed, -Math.PI / 16);
    this.bod.movement.addPos(this.bod, 0, 3, this.aniSpeed * 2, Math.PI / 16);
    this.bod.movement.addPos(this.bod, 0, 3, this.aniSpeed, 0);
    this.bod.movement.start();
    
    this.rShoulder.movement = new BAWL.MovePath(this.head, this.rShoulder, this.movements[this.moveKeys.walk]);
    this.rShoulder.movement.addPos(this.rShoulder, 17, -4, this.aniSpeed, -Math.PI / 32);
    this.rShoulder.movement.addPos(this.rShoulder, 18, 0, this.aniSpeed, 0);
    this.rShoulder.movement.addPos(this.rShoulder, 17, 4, this.aniSpeed, -Math.PI / 32);
    this.rShoulder.movement.addPos(this.rShoulder, 18, 0, this.aniSpeed, 0);
    this.rShoulder.movement.start();
    
    this.lShoulder.movement = new BAWL.MovePath(this.head, this.lShoulder, this.movements[this.moveKeys.walk]);
    this.lShoulder.movement.addPos(this.lShoulder, -17, 4, this.aniSpeed, -Math.PI / 32);
    this.lShoulder.movement.addPos(this.lShoulder, -18, 0, this.aniSpeed, 0);
    this.lShoulder.movement.addPos(this.lShoulder, -17, -4, this.aniSpeed, -Math.PI / 32);
    this.lShoulder.movement.addPos(this.lShoulder, -18, 0, this.aniSpeed, 0);
    this.lShoulder.movement.start();
    
    this.lElbow.movement = new BAWL.MovePath(this.head, this.lElbow, this.movements[this.moveKeys.walk]);
    this.lElbow.movement.addPos(this.lElbow, -25, 3, this.aniSpeed);
    this.lElbow.movement.addPos(this.lElbow, -27, -2, this.aniSpeed);
    this.lElbow.movement.addPos(this.lElbow, -25, -5, this.aniSpeed);
    this.lElbow.movement.addPos(this.lElbow, -27, -2, this.aniSpeed);
    this.lElbow.movement.start();
    
    this.rElbow.movement = new BAWL.MovePath(this.head, this.rElbow, this.movements[this.moveKeys.walk]);
    this.rElbow.movement.addPos(this.rElbow, 25, -6, this.aniSpeed);
    this.rElbow.movement.addPos(this.rElbow, 27, -2, this.aniSpeed);
    this.rElbow.movement.addPos(this.rElbow, 25, 2, this.aniSpeed);
    this.rElbow.movement.addPos(this.rElbow, 27, -2, this.aniSpeed);
    this.rElbow.movement.start();
    
    this.lHand.movement = new BAWL.MovePath(this.head, this.lHand, this.movements[this.moveKeys.walk]);
    this.lHand.movement.addPos(this.lHand, -35, 1, this.aniSpeed, -Math.PI / 3);
    this.lHand.movement.addPos(this.lHand, -38, -9, this.aniSpeed, -Math.PI / 6);
    this.lHand.movement.addPos(this.lHand, -32, -13, this.aniSpeed, -Math.PI / 10);
    this.lHand.movement.addPos(this.lHand, -38, -9, this.aniSpeed, -Math.PI / 4);
    this.lHand.movement.start();
    
    this.rHand.movement = new BAWL.MovePath(this.head, this.rHand, this.movements[this.moveKeys.walk]);
    this.rHand.movement.addPos(this.rHand, 35, -13, this.aniSpeed, Math.PI / 10);
    this.rHand.movement.addPos(this.rHand, 38, -9, this.aniSpeed, Math.PI / 6);
    this.rHand.movement.addPos(this.rHand, 33, 1, this.aniSpeed, Math.PI / 3);
    this.rHand.movement.addPos(this.rHand, 38, -9, this.aniSpeed, Math.PI / 4);
    this.rHand.movement.start();
    
    this.rFoot.movement = new BAWL.MovePath(this.head, this.rFoot, this.movements[this.moveKeys.walk]);
    this.rFoot.movement.addPos(this.rFoot, 6, 12, this.aniSpeed);
    this.rFoot.movement.addPos(this.rFoot, 6, 0, this.aniSpeed);
    this.rFoot.movement.addPos(this.rFoot, 6, -12, this.aniSpeed);
    this.rFoot.movement.addPos(this.rFoot, 6, 0, this.aniSpeed);
    this.rFoot.movement.start();
    
    this.lFoot.movement = new BAWL.MovePath(this.head, this.lFoot, this.movements[this.moveKeys.walk]);
    this.lFoot.movement.addPos(this.lFoot, -6, -12, this.aniSpeed);
    this.lFoot.movement.addPos(this.lFoot, -6, 0, this.aniSpeed);
    this.lFoot.movement.addPos(this.lFoot, -6, 12, this.aniSpeed);
    this.lFoot.movement.addPos(this.lFoot, -6, 0, this.aniSpeed);
    this.lFoot.movement.start();
    
    console.log(this.movements[0].movePaths);
}


BAWL.Player.prototype.setPositions = function(ps) {
    for (i in ps) {
        ps[i].sprite.rotation = this.head.rotation + ps[i].rotation;
        ps[i].sprite.x = this.head.x + Math.sin(this.head.rotation) * -ps[i].y + Math.cos(this.head.rotation) * ps[i].x;
        ps[i].sprite.y = this.head.y + Math.cos(this.head.rotation) * ps[i].y + Math.sin(this.head.rotation) * ps[i].x;
    }  
}
    
    
    
//___________________________________UTILITY_____________________________________\\
    
BAWL.Player.prototype.getPoint = function(x, y, rot) {
    this.parts.children[i].rotation = this.head.rotation + this.parts.children[i].offset.rotation;
        this.parts.children[i].x = this.head.x + Math.sin(this.head.rotation) * -this.parts.children[i].offset.y + Math.cos(this.head.rotation) * this.parts.children[i].offset.x;
        this.parts.children[i].y = this.head.y + Math.cos(this.head.rotation) * this.parts.children[i].offset.y + Math.sin(this.head.rotation) * this.parts.children[i].offset.x;
    
    var point = new Phaser.Point(this.head.x + Math.sin(this.head.rotation) * -y + Math.cos(this.head.rotation) * x, this.head.y + Math.cos(this.head.rotation) * y + Math.sin(this.head.rotation) * x);
    point.rotation = this.head.rotation;
    return point;
}
    













