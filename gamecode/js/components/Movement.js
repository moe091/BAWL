//movement contains a list of movepaths and a char they belong to
//it organizes animations into steps instead of paths for easier editing
BAWL.Movement = function(parent, name) {
    this.parent = parent;
    this.name = name;
    this.steps = [];
    this.curStep = null;
    
    this.sprites = [];
    
    this.step = 0;
    this.nextStep;
    this.elapsed = 0;
    this.tRatio = 0;
    
}

BAWL.Movement.prototype.start = function() {
    this.step = 0;
    this.elapsed = 0;
    this.curStep = this.steps[this.step];
    this.nextStep = this.steps[this.step + 1]; //WARNING: check if steps[step + 1] exists
}


BAWL.Movement.prototype.update = function() {
    if (this.curStep != null && this.nextStep != null) {
        this.elapsed+= game.time.elapsed; //update elapsed

        if (this.elapsed > this.nextStep.time) { //check if this step is over yet
            this.endStep(); 
        }

        //Update positions based on tRatio
        this.tRatio = (this.elapsed - this.curStep.time) / (this.nextStep.time - this.curStep.time);
        this.curStep.update(this.tRatio, this.nextStep);
    } else {
        console.warn("curStep or nextStep is null. curStep:");
        console.log(this.curStep);
        console.log("nextStep: ");
        console.log(this.nextStep);
        console.log("movement: " );
        console.log(this);
    }
    
    
}

BAWL.Movement.prototype.endStep = function() {
    this.step++;
    if (this.step >= this.steps.length) {
        //if repeat = true
        this.step = 0;
        //else this.end
    }
    this.curStep = this.steps[this.step];
    if (this.step + 1 >= this.steps.length) {
        //if repeat = true;
        this.nextStep = this.steps[0];
        this.elapsed = 0;
    } else {
        this.nextStep = this.steps[this.step + 1];
    }
}


BAWL.Movement.prototype.jsonPositions = function(n) {
    if (n == null)
        n = this.name;
    
    var save = {};
    
    save.name = n;
    save.sprites = [];
    for (var i in this.sprites) {
        save.sprites[this.sprites[i].index] = this.sprites[i].name;
    }
    
    save.steps = [];
    for (var i in this.steps) {
        var thisStep = {};
        thisStep.time = this.steps[i].time;
        save.steps[i] = thisStep;
    }
    
    for (var i in save.steps) {
        save.steps[i].positions = [];
        for (var j in this.steps[i].positions) {
            thisPos = {};
            //thisPos.index = this.steps.positions[j] = p;
            thisPos.time = this.steps[i].positions[j].time;
            thisPos.spriteName = this.steps[i].positions[j].sprite.name;
            thisPos.x = this.steps[i].positions[j].x;
            thisPos.y = this.steps[i].positions[j].y;
            thisPos.rotation = this.steps[i].positions[j].rotation;
            //thisPos.duration = this.steps.positions[j].duration;
            save.steps[i].positions[j] = thisPos;
        
        }
    }
    
    console.log(save);
    return JSON.stringify(save);
    /**
    var jsonPaths = [];
    for (m in this.movePaths) { //each sprite has a path of positions
        var path = {};
        path.index = m;
        path.spriteName = this.movePaths[m].sprite.name;
        path.defaultX = this.movePaths[m].default.x;
        path.defaultY = this.movePaths[m].default.y;
        path.defaultRot = this.movePaths[m].default.rotation;
        path.movementName = this.movePaths[m].movement.name;
        path.parentName = this.movePaths[m].parent.name;
        path.positions = [];
        for (p in this.movePaths[m].positions) {
            var pos = this.movePaths[m].positions[p];
            var jPos = {};
            
            jPos.index = p;
            jPos.time = pos.time;
            jPos.spriteName = pos.sprite.name;
            jPos.x = pos.x;
            jPos.y = pos.y;
            jPos.rotation = pos.rotation;
            jPos.duration = pos.duration;
            path.positions.push(jPos);
            
            
        }
        jsonPaths.push(path);
    }
    console.log(jsonPaths);
    return JSON.stringify(jsonPaths);
    **/
}





BAWL.Movement.prototype.setStep = function(char, sNum) {
    this.parent.setPositions(sNum.positions);
}

BAWL.Movement.prototype.addPos = function(path, point) {
    exists = false;
    for (s in this.steps) {
        if (this.steps[s].time == point.time) {
            exists = true;
            this.steps[s].positions[Number(point.sprite.index)] = point;
        }
    }
    if (exists == false) {
        newStep = new BAWL.step(point.time, this);
        newStep.positions.push(point);
        newStep.positions[Number(point.sprite.index)] = point;
        this.steps.push(newStep);
    }
    this.steps.sort(function(s1, s2) {
        return s1.time - s2.time;
    });
}

BAWL.Movement.prototype.addSprite = function(sprite) {
    var n = Number(sprite.index);
    this.sprites[n] = sprite;
    for (i in this.steps) {
        this.steps[i].positions[n] = new Phaser.Point(0, 0);
        this.steps[i].positions[n].rotation = 0;
    }
    this.updatePosSprites();
}

BAWL.Movement.prototype.updatePosSprites = function() {
    for (var i in this.steps) {
        for (var j in this.sprites) {
            if (this.steps[i].positions[j] == null) {
                console.warn("updatePosSprites() - position " + j + " in step " + i + " is null");
            } else {
                if (this.steps[i].positions[j].sprite != null && this.steps[i].positions[j].sprite != this.sprites[j]) {
                    console.warn("Switching sprite in step " + i + " position " + j + ".");
                }
                this.steps[i].positions[j].sprite = this.sprites[j];
            }
        }
    }

}














BAWL.step = function(time, movement) {
    this.time = time;
    this.positions = []; //WARNING: POSITION INDEXES MUST REMAIN CONSTANT FOR ALL STEPS. i know...
    console.log("new step: ");
    console.log(time);
    console.log(movement);
    console.log(this);
    if (movement != null) {
        this.movement = movement;
    } else {
        console.warn("NO MOVEMENT FoR THIS STEP: ");
        console.log(this);
    }
}

//update sprites in each position for this sprite based on tRatio and next step positions
BAWL.step.prototype.update = function(tRatio, nextStep) {
    for (i in this.positions) {
        if (nextStep.positions[i] != null) {
            this.positions[i].sprite.offset.x = this.positions[i].x + (tRatio * (nextStep.positions[i].x - this.positions[i].x));
            this.positions[i].sprite.offset.y = this.positions[i].y + (tRatio * (nextStep.positions[i].y - this.positions[i].y));
            this.positions[i].sprite.offset.rotation = this.positions[i].rotation + (tRatio * (nextStep.positions[i].rotation - this.positions[i].rotation));
        }
    }
}





    
    
    
    
    
    
    










