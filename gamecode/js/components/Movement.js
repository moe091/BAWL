BAWL.Movement = function(parent, name) {
    this.movePaths = [];
    this.name = name;
    this.timeSteps = [];
}

BAWL.Movement.prototype.addPath = function(path) {
    this.movePaths.push(path);
}

BAWL.Movement.prototype.update = function() {
    this.movePaths.callAll(function(path) {
        path.update();
    });
}

BAWL.Movement.prototype.addTimeSteps = function() {
    var p;
    var t = 0;
    for (path in this.movePath) {
        for (pos = this.movePath[path].positions) {
            p = this.movePath[path].positions[pos]; //I don't feel like typing a lot
            
            t+= p.duration;
            this.addPosAtTime(this.movePath[path].sprite, this.movePath[path].parent, p);
            
        }
    }
}

BAWL.Movement.prototype.addPosAtTime(sprite, parent, pos) {
    ki
}

BAWL.Movement.prototype.addTimeStep = function(t) {
    
}

BAWL.Step = function(time) {
    this.time = time;
}