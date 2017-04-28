
var AnimationEditor = {

    
aniEditor: null,
chars: null,  
char: null,
movement: null,
sprite: null,
sIndex: null,
curPos: null,
    
oldPos: null;
    
editMode: function() {
    game.input.enabled = false;

    this.aniEditor.style.backgroundColor = "#1a1a1a";

    this.populateChars(BAWL.gameWorld.chars);
},

unpause: function() {
    game.input.enabled = true;
    this.aniEditor.style.backgroundColor = "#000000";
},

populateChars: function(charList) {
    this.chars = charList;
    $("#charDropdown").html("");
    for (var i = 0; i < charList.length; i++) {
        $('#charDropdown').append('<option value='+i+'>'+ charList[i].name +'</option>');
    }
    this.selectChar($("#charDropdown").val());
},
    
populateMovements: function() {
    $("#movementDropdown").html("");
    for (i in this.char.movements) {
        $("#movementDropdown").append('<option value='+i+'>'+ this.char.movements[i].name +'</option>');
    }
    this.selectMovement($("#movementDropdown").val())
},
    
populateTimeSteps: function() {
    $("#timestepDropdown").html("");
    for (i in this.movement.steps) {
        $("#timestepDropdown").append("<option value=" + i + ">" + this.movement.steps[i].time + "</option>");
    }
    this.selectTimestep($("#timestepDropdown").val());
},
    
populateSprites: function() {
    $("#spriteDropdown").html("");
    for (i in this.tStep.positions) {
        $("#spriteDropdown").append('<option value=' + i + '>' + this.tStep.positions[i].sprite.name + '</option>');
    }
},
    

    
selectChar: function(c) {
    this.char = this.chars[c];
    this.populateMovements();
},
    
selectMovement: function(m) {
    this.movement = this.char.movements[m];
    this.populateTimeSteps();
    this.movement.printSteps();
},

selectTimestep: function(t) {
    this.tStep = this.movement.steps[t];
    this.movement.setStep(this.char, t);
    this.createStepEditor();
    this.populateSprites();
    this.updateVals();
},

    
updateVals: function() {
    console.log(this.curPos);
    var posi;
    for (i in this.tStep.positions) {
        posi = this.tStep.positions[i];
        $("#xVal-" + i).val(posi.x);
        $("#yVal-" + i).val(posi.y);
        $("#rotVal-" + i).val(posi.rotation);
        $("#durVal-" + i).val(posi.duration);
    }
    this.updatePosition();
},
    
updatePosition: function() {
    console.log("ANI updatePosition() " + this.tStep.positions.length);
    
    var ps;
    for (i in this.tStep.positions) {
        ps = this.tStep.positions[i];
        ps.sprite.offset.x = $("#xVal-" + i).val();
        ps.sprite.offset.y = $("#yVal-" + i).val();
        
        console.log("-----");
        console.log(ps.sprite.offset.rotation)
        ps.sprite.offset.rotation = $("#rotVal-" + i).val(); 
        console.log(ps.sprite.offset.rotation)
        console.log("-----");
    }
    
    this.char.changePos();
},
    
setSpriteOffset(pos) {
    console.log("HERE");
    pos.sprite.offset.x = pos.x;
    pos.sprite.offset.y = pos.y;
    pos.sprite.offset.rotation = pos.rotation;
    console.log(pos.sprite.name);
    console.log(pos.sprite.offset);
},
    
createStepEditor() {
    sEditor = $("#stepEditor");
    
    sEditor.html("");
    var ps;
    for (var i = 0; i < this.tStep.positions.length; i++) {
        ps = this.tStep.positions[i];
        sEditor.append("<div id='coordEdit-" + i + "' " +  "class='editVal'>");//editVal div
            $("#coordEdit-" + i).append("<p class='cLabel'>" + ps.sprite.name + "</p>");//sprite label
            $("#coordEdit-" + i).append("<span class='x valSpan valSpan-" + i + "'>");//value span X
                $(".x.valSpan-" + i).append("<label>X: </label>");
                $(".x.valSpan-" + i).append("<input type='number' id='xVal-" + i + "' class='pVal editInputN'>");
            $("#coordEdit-" + i).append("</span>");//close  value span X
        
            $("#coordEdit-" + i).append("<span class='y valSpan valSpan-" + i + "'>");//value span X
                $(".y.valSpan-" + i).append("<label>Y: </label>");
                $(".y.valSpan-" + i).append("<input type='number' id='yVal-" + i + "' class='pVal editInputN'>");
            $("#coordEdit-" + i).append("</span>");//close  value span Y
        
            $("#coordEdit-" + i).append("<span class='r valSpan valSpan-" + i + "'>");//value span X
                $(".r.valSpan-" + i).append("<label>Rot: </label>");
                $(".r.valSpan-" + i).append("<input type='number' id='rotVal-" + i + "' class='pVal editInputLN'>");
            $("#coordEdit-" + i).append("</span>");//close  value span Rot
        
            $("#coordEdit-" + i).append("<span class='d valSpan valSpan-" + i + "'>");//value span X
                $(".d.valSpan-" + i).append("<label>Dur: </label>");
                $(".d.valSpan-" + i).append("<input type='number' id='durVal-" + i + "' class='pVal editInputN'>");
            $("#coordEdit-" + i).append("</span>");//close  value span Dur
        sEditor.append("</div>");
    }
    updateEditorCallbacks();
}
    
    

};
    









