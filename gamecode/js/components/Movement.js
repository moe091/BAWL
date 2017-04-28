BAWL.Movement = function(parent, name) {
    this.movePaths = [];
    this.name = name;
    this.steps = [];
    this.curStep = null;
    
    this.step = 0;
    this.nextStepTime = 0;
    this.elapsed = 0;
}

BAWL.Movement.prototype.addPath = function(path) {
    this.movePaths.push(path);
}

BAWL.Movement.prototype.update = function() {
    if (this.elapsed > this.nextStepTime) {
        this.endStep();
    }
    for (p in this.curStep.positions) {
        this.curStep.positions[p]
    }
    
    this.elapsed+= game.time.elapsed;
}


BAWL.Movement.prototype.jsonPositions = function(n) {
    if (n == null)
        n = this.name;
    var jsonPaths = [];
    for (m in this.movePaths) { //each sprite has a path of positions
        var path = {};
        path.spriteName = this.movePaths[m].sprite.name;
        path.defaultX = this.movePaths[m].default.x;
        path.defaultY = this.movePaths[m].default.y;
        path.defaultRot = this.movePaths[m].default.rotation;
        path.movementName = this.movePaths[m].movement.name;
        path.parentName = this.movePaths[m].parent.name;
        path.positions = [];
        path.index = m;
        for (p in this.movePaths[m].positions) {
            var pos = this.movePaths[m].positions[p];
            var jPos = {};
            
            jPos.time = pos.time;
            jPos.spriteName = pos.sprite.name;
            jPos.x = pos.x;
            jPos.y = pos.y;
            jPos.rotation = pos.rotation;
            jPos.duration = pos.duration;
            jPos.index = p;
            path.positions.push(jPos);
            
            
        }
        jsonPaths.push(path);
    }
    console.log(jsonPaths);
    return jsonPaths;
}





BAWL.Movement.prototype.setStep = function(char, sNum) {
    char.setPositions(this.steps[sNum].positions);
}

BAWL.Movement.prototype.addPos = function(path, point) {
    exists = false;
    for (s in this.steps) {
        if (this.steps[s].time == point.time) {
            exists = true;
            this.steps[s].positions.push(point);
        }
    }
    if (exists == false) {
        newStep = new BAWL.step(point.time);
        newStep.positions.push(point);
        this.steps.push(newStep);
    }
    this.steps.sort(function(s1, s2) {
        return s1.time - s2.time;
    });
}

BAWL.Movement.prototype.printSteps = function() {
    for (s in this.steps) {
        console.log("------------");
        console.log("step: " + s);
        console.log(this.steps[s].time);
        console.log(this.steps[s].positions.length);
        console.log(this.steps[s].positions[0].sprite.name);
        console.log("------------");
    }

}





BAWL.step = function(time) {
    this.time = time;
    this.positions = [];
}