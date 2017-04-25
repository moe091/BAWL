BAWL.MovePath = function(parent, sprite) {
    this.parent = parent;
    this.sprite = sprite;
    if (sprite.offset == null) {
        throw "RelativePos - sprite does not have an offset property";
    }
    this.default = sprite.offset;
    this.positions = [];
    console.log(this.positions[0] + " - positoin 0");
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
    
    this.addPos(this.default.x, this.default.y, 0);
}

//_________________________________PREP____________________________________\\

//each point defines the endpoint of a motion that begins at the point before it(n-1).
BAWL.MovePath.prototype.addPos = function(x, y, duration) {
    var point = new Phaser.Point(x, y);
    point.duration = duration;
    this.startTime = 0;
    this.positions.push(point);
    console.log("-----------------");
    console.log(this.positions[0]);
    console.log(this.positions[1]);
    console.log("-----------------");
}

BAWL.MovePath.prototype.setFinishCallback = function(cb) {
    this.onFinish = cb;
}



//__________________________________MOVEMENT______________________________\\
BAWL.MovePath.prototype.start = function() {
    if (this.positions.length >= 2) {
        this.active = true;
        this.step = 1;
        
        this.previous = this.positions[0];
        this.target = this.positions[1];
        
        this.startTime = game.time.now;
        this.elapsed = 0;
        this.dX = this.positions[0].x - this.positions[1].x;
        this.dY = this.positions[0].y - this.positions[1].y;
        
        this.sprite.offset.x = this.positions[0].x;
        this.sprite.offset.y = this.positions[0].y;
    }
}
BAWL.MovePath.prototype.update = function() {
    if (this.active) {
        this.elapsed = game.time.now - this.startTime;
        if (this.elapsed > this.target.duration) {
            this.endStep();
        } else {
            this.sprite.offset.x = this.previous.x + ((this.elapsed / this.target.duration) * (this.target.x - this.previous.x));
            this.sprite.offset.y = this.previous.y + ((this.elapsed / this.target.duration) * (this.target.y - this.previous.y));
        }
        //console.log("sprite x/y: " + this.sprite.x + " / " + this.sprite.y);
        //console.log("offset: " + this.sprite.offset.x + " / " + this.sprite.offset.y);
    }
}
BAWL.MovePath.prototype.endStep = function() {
    this.sprite.offset.x = this.target.x;
    this.sprite.offset.y = this.target.y;
    this.step++;
    if (this.step >= this.positions.length) {
        this.endMovement();
    } else {
        this.previous = this.positions[this.step - 1];
        this.target = this.positions[this.step];
        this.elapsed = 0;
        this.startTime = game.time.now;
        
        this.dX = this.previous.x - this.target.x;
        this.dY = this.previous.y - this.target.y;
    }
}
BAWL.MovePath.prototype.endMovement = function() {
    if (this.repeat) {
        this.start();
    }
}











