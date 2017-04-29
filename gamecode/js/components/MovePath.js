BAWL.MovePath = function(parent, sprite, movement) {
    this.parent = parent;
    this.sprite = sprite;
    this.movement = movement;
    
    if (sprite.offset == null) { //sprites need an offset property because that's how MovePath updates their location relative to it's actual position
        console.warn("Sprite doesn't have offset object, creating default one. Sprite:");
        console.log(this.sprite);
        this.sprite.offset = new Phaser.Point(0, 0);
    }
    
    this.default = sprite.offset;
    this.positions = [];
    this.repeat = true;
    this.reverse = true; //UNIMPLEMENTED. if true, it will perform the movement sequence in reverse after finishing it.
    this.onFinish = null; //callback when animation finishes
    
    this.target = null;
    this.step = 0;
    this.previous = null;
    this.active = false;
    
    this.elapsed = 0;
    this.startTime = 0;
    this.tRatio = 0;
    this.curTime = 0;
    //add default position as position[0]
}







//_________________________________SETUP____________________________________\\

//each point defines the endpoint of a motion that begins at the point before it(n-1).
BAWL.MovePath.prototype.addPos = function(s, x, y, duration, rotation, time) {
    this.curTime+= duration;
    var point = new Phaser.Point(x, y);
    point.rotation = (rotation == null) ? 0 : rotation;
    point.duration = duration;
    point.time = this.curTime;
    if (time != null) {
        point.time = time;
    }
    point.sprite = s;
    point.path = this;
    this.movement.addPos(this, point);
    this.positions.push(point);
}

BAWL.MovePath.prototype.setFinishCallback = function(cb) {
    this.onFinish = cb;
}







//__________________________________MOVEMENT______________________________\\

BAWL.MovePath.prototype.start = function(overTime) {
    if (overTime == null)
        overTime = 0;
    if (this.positions.length >= 2) {
        this.active = true;
        this.step = 1;
        
        this.previous = this.positions[0];
        this.target = this.positions[1];
        
        this.startTime = game.time.now - overTime;
        this.elapsed = overTime;
        
        this.dX = this.positions[0].x - this.positions[1].x;
        this.dY = this.positions[0].y - this.positions[1].y;
        
        this.sprite.offset.x = this.positions[0].x;
        this.sprite.offset.y = this.positions[0].y;
    } else {
        console.warn("Tried to start MovePath with less than 2 positions: ");
        console.log(this);
    }
}
    
BAWL.MovePath.prototype.update = function() {
    if (this.active) {
        this.elapsed+= game.time.elapsed;
        this.tRatio = this.elapsed / this.target.duration;
        if (this.tRatio >= 1) {
            this.endStep(this.elapsed - this.target.duration);
        } else {
            console.log("tRatio: " + this.tRatio);
            this.sprite.offset.x = this.previous.x + (this.tRatio * (this.target.x - this.previous.x));
            this.sprite.offset.y = this.previous.y + (this.tRatio * (this.target.y - this.previous.y));
            this.sprite.offset.rotation = this.previous.rotation + (this.tRatio * (this.target.rotation - this.previous.rotation));
        }
    }
}

BAWL.MovePath.prototype.endStep = function(overTime) {
    this.sprite.offset.x = this.target.x;
    this.sprite.offset.y = this.target.y;
    this.step++;
    if (this.step >= this.positions.length) {
        this.endMovement(overTime);
    } else {
        this.previous = this.positions[this.step - 1];
        this.target = this.positions[this.step];
        this.elapsed = overTime;
        this.startTime = game.time.now - overTime;
        
        this.dX = this.previous.x - this.target.x;
        this.dY = this.previous.y - this.target.y;
    }
}

BAWL.MovePath.prototype.endMovement = function(overTime) {
    if (this.repeat) {
        this.start(overTime);
    }
}











