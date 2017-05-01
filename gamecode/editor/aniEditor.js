
var AnimationEditor = {

    
aniEditor: null,
chars: null,  
char: null,
movement: null,
sprite: null,
sIndex: null,
curPos: null,
    
oldPos: null,
    
editMode: function() {
    game.input.enabled = false;
    console.log("input disabled");
    this.aniEditor.style.backgroundColor = "#1a1a1a";

    this.populateChars(BAWL.gameWorld.chars);
},

unpause: function() {
    console.log("input enabled");
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
    console.log("POPULATE MOVEMENTS---");
    console.log(this.char.movements);
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
    
    if ($("#timestepDropdown").val() != -1)
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
    
//BAWL.Movement. class that stores all movePaths of a specific movement(e.g 'walk')
selectMovement: function(m) {
    if (m == -1) {
        console.log("WARNING: OLD CODE - THIS Isn't how new movements are created anymore");
        //this.movement = new BAWL.Movement(this.char, prompt("Enter name for new movement: "));
        //this.char.movements.push(this.movement);
        //$("#movementDropdown").prepend('<option value='+i+'>'+ this.movement.name +'</option>');
    } else {
        this.movement = this.char.movements[0];
    }
    this.populateTimeSteps();
},

selectTimestep: function(t) {
    this.tStep = this.movement.steps[t];
    if (this.movement.steps[t] != null) {
        this.createStepEditor();
        this.updateVals();
        this.updatePosition();
        this.populateSprites();
    } else {
        console.log("TiMeStep is null");
    }
},

selectSprite: function(s) {
    console.log(this.tStep);
},

log: function() {
    console.log("old: ");
    console.log(oldPos);
    console.log("new: ");
    console.log(this.tStep.positions[0]);
},
updateVals: function() {
    var posi;
    for (var i in this.tStep.positions) {
        posi = this.tStep.positions[i];
        $("#xVal-" + i).val(posi.x);
        $("#yVal-" + i).val(posi.y);
        $("#rotVal-" + i).val(Math.round(posi.rotation * (180 / Math.PI)));
        $("#durVal-" + i).val(posi.duration);
    }
},
    
updatePosition: function() {
    
    for (i in this.tStep.positions) {
        this.tStep.positions[i].x = Number($("#xVal-" + i).val());
        this.tStep.positions[i].y = Number($("#yVal-" + i).val());
        this.tStep.positions[i].rotation = Number(($("#rotVal-" + i).val() / 180) * Math.PI);
    }
    
    this.movement.setStep(this.char, this.tStep);
    
},
    
setSpriteOffset(pos) {
    pos.sprite.offset.x = pos.x;
    pos.sprite.offset.y = pos.y;
    pos.sprite.offset.rotation = pos.rotation;
},
    
createStepEditor() {
    sEditor = $("#stepEditor");
    
    sEditor.html("");
    var ps;
    var degrees;
    for (var i = 0; i < this.movement.sprites.length; i++) {
        ps = this.movement.sprites[i];
        sEditor.append("<div id='coordEdit-" + i + "' " +  "class='editVal'>");//editVal div
            $("#coordEdit-" + i).append("<p class='cLabel'>" + ps.name + "</p>");//sprite label
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
    //updateEditorCallbacks();
},
  

makeDownloadLink: function() {
    var data = "text/json;charset=utf-8," + encodeURIComponent(this.movement.jsonPositions($("#nameInput").val()));
    console.log(data);
     $("#aniBtns").append("<a href='data:" + data + "' download='" + $("#nameInput").val() + ".json'>Download JSON</a>");
},
    
    
    
    
    
//------------------------------------------NEW BUTTONS------------------------------------------\\
  
newMovement: function() {
    mName = prompt("Enter name for new movement:");
    newMove = new BAWL.Movement(this.char, mName);
    this.movement = newMove;
    this.char.movements.push(newMove);
    this.populateMovements();
    
},
  
newStep: function() {
    newStep = new BAWL.step(prompt("Enter time in MS for new step:"));
    this.movement.steps.push(newStep);
    this.populateTimeSteps();
},

//when Add Sprite is clicked, display sprite dialog
addSpriteToStep: function() {
    this.createSpriteDialog();
},
createSpriteDialog: function() {
    $("#spriteDialog").css("display", "inline-block"); //Show Dialog
    
    //Populate Dialog with sprites of currently selected char
    $("#addSpriteOpt").html("");
    for (i in this.char.parts.children) {
        $("#addSpriteOpt").append("<option value=" + i + ">" + this.char.parts.children[i].name + "</option>");
    }
    
},


    
    
};
    










