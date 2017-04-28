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


BAWL.Movement.prototype.endStep = function() {
    this.step++;
    if (this.step >= this.steps.length) {
        this.step = 0;
        this.elapsed = 0;
        this.nextStepTime = this.steps[this.step + 1].time;
        this.curStep = this.steps[step];
    } else {
        this.curStep = this.steps[step];
        if (this.step + 1 >= this.steps.length) {
            this.nextStepTime = this.curStep.time + this.curStep.duration;
        } else {
            this.nextStepTime = this.steps[this.step + 1].time;
        }
    }
    
}





BAWL.Movement.prototype.setStep = function(char, sNum) {
    char.setPositions(this.steps[sNum].positions);
}

BAWL.Movement.prototype.addPos = function(path, point) {
    console.log(point.time);
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