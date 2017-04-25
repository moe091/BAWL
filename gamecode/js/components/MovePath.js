BAWL.MovePath = function(parent, sprite) {
    this.parent = parent;
    this.sprite = sprite;
    if (sprite.offset == null) {
        throw "RelativePos - sprite does not have an offset property";
    }
    this.default = sprite.offset;
    this.positions = [];
    this.repeat = true;
    this.reverse = true; //if true, it will perform the movement sequence in reverse after finishing it.
    this.onFinish = null;
    
    this.target = null;
    this.step = 0;
    this.previous = null;
    this.active = false;
    
    this.elapsed = 0;
    this.startTime = 0;
    this.dX = 0;
    this.dY = 0;
    this.tRatio = 0;
    
    this.addPos(this.default.x, this.default.y, 0, this.default.rotation);
    console.log(this.default.rotation + ' - def rot');
}

//_________________________________PREP____________________________________\\

//each point defines the endpoint of a motion that begins at the point before it(n-1).
BAWL.MovePath.prototype.addPos = function(x, y, duration, rotation) {
    var point = new Phaser.Point(x, y);
    point.rotation = (rotation == null) ? 0 : rotation;
    point.duration = duration;
    this.startTime = 0;
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
    }
}
BAWL.MovePath.prototype.update = function() {
    if (this.active) {
        this.elapsed = game.time.now - this.startTime;
        this.tRatio = this.elapsed / this.target.duration;
        if (this.elapsed > this.target.duration) {
            this.endStep(this.elapsed - this.target.duration);
        } else {
            this.sprite.offset.x = this.previous.x + ((this.elapsed / this.target.duration) * (this.target.x - this.previous.x));
            this.sprite.offset.y = this.previous.y + ((this.elapsed / this.target.duration) * (this.target.y - this.previous.y));
            this.sprite.offset.rotation = this.previous.rotation + (this.tRatio * (this.target.rotation - this.previous.rotation));
        }
        //console.log("sprite x/y: " + this.sprite.x + " / " + this.sprite.y);
        //console.log("offset: " + this.sprite.offset.x + " / " + this.sprite.offset.y);
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











