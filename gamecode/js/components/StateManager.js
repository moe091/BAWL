BAWL.StateManager = function(parent) {
    this.parent = parent;
    this.states = [];
    
    this.curState = 0;
    this.updateState = 0,
    
    this.addState = function(id, state) {
        state.SM = this;
        this.states[id] = state;
    },
    
    this.update = function() {
        this.states[this.curState].update();
        this.updateState = this.states[this.curState].checkUpdate();
        console.log(this.curState);
        if (this.updateState) {
            this.changeState();
        }
    },
        
    this.changeState = function() {
        this.curState = this.updateState;
        this.updateState = 0;
        console.log("change state - " + this.curState);
    }
};
    
        
    
