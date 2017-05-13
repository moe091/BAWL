BAWL.Enemy = function(spriteName, x, y) {
    this.sprite = game.add.sprite(x, y, spriteName);
    this.sprite.anchor.setTo(0.5);
    this.id = 11;
    
    this.state = [];
    this.state[0] = { //enemies will be saved in external file, states will be loaded in at beginning of each level(level file will store which enemies need to be laoded)
        checkUpdate: BAWL.stateChecks.proximityCheck(320),
        update: function() {
            this.checkUpdate();
            console.log('checked');
        }
    };
    this.state[1] = {
        update: BAWL.stateUpdates.moveDown
    };
    
    this.setStates();
}

BAWL.Enemy.prototype.distToSprite = function(s) {
    return Math.sqrt(Math.pow(this.sprite.x - s.x, 2) + Math.pow(this.sprite.y - s.y, 2));
}

BAWL.Enemy.prototype.setStates = function() {
    this.SM = new BAWL.StateManager(this);
    this.defaultState = new BAWL.State(this, 0);
    this.defaultState.update = function() {};
    this.defaultState.checkUpdate = BAWL.stateChecks.proximityCheck(320, 1);
    this.SM.addState(0, this.defaultState);
    
    this.moveState = new BAWL.State(this, 1);
    this.moveState.update = BAWL.stateUpdates.moveDown;
    this.moveState.checkUpdate = BAWL.stateChecks.outOfRangeCheck(500, 0);
    this.SM.addState(1, this.moveState);
}

BAWL.Enemy.prototype.update = function() {
    if (this.SM) {
        this.SM.update();
    }
}





BAWL.stateChecks = {
    proximityCheck: function(dist, returnState) {
        return function() { 
            if (this.SM.curState == 0) {
                if (this.parent.distToSprite(BAWL.play.player.head) < dist) {
                    return returnState;
                } 
                return 0;
            }
        }
    },
    
    outOfRangeCheck: function(dist, returnState) {
        return function() { 
            if (this.SM.curState == 1) {
                console.log("OOR CHECK: " + this.parent.distToSprite(BAWL.play.player.head));
                if (this.parent.distToSprite(BAWL.play.player.head) > dist) {
                    return returnState;
                } 
                return 0;
            }
        }
    }
}

BAWL.stateUpdates = {
    moveDown: function() {
        this.parent.sprite.y+= 1;
        this.checkUpdate(this);
    }
}