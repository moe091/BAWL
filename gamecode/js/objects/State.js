BAWL.State = function(parent, id) {
    this.parent = parent,
    this.id = id,
    this.SM = null;
    
    this.checkUpdate = function() {
        return false;
    }
    
    this.update = function() {
        console.log("update:");
        console.log(this);
    }
}