
var AnimationEditor = {
paused: false,
    
aniEditor: null,
chars: null,  
char: null,
movement: null,
sprite: null,
sIndex: null,
curPos: null,
    
oldPos: null,
//__________________________________________ON / OFF _____________________________________\\
editMode: function() {
    game.input.enabled = false;
    this.paused = true;
    
    this.aniEditor.style.backgroundColor = "#1a1a1a";

    this.populateChars(BAWL.gameWorld.chars);
    updateEditorCallbacks();
},
unpause: function() {
    if (this.movement) {
        this.movement.start();
    } else {
        console.log("unpausing - NO MOVEMENT");
    }
    
    this.paused = false;
    game.input.enabled = true;
    this.aniEditor.style.backgroundColor = "#000000";
},

    
    

//__________________________________________POPULATE EDITOR___________________________________________\\
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
    else
        this.createStepEditor();
},
    
populateSprites: function() {
    $("#spriteDropdown").html("");
    for (i in this.tStep.positions) {
        $("#spriteDropdown").append('<option value=' + i + '>' + this.tStep.positions[i].sprite.name + '</option>');
    }
},
    

    
    
    
    
    
//_____________________________________________________SELECTION UPDATES_________________________________________\\
selectChar: function(c) {
    this.char = this.chars[c];
    this.populateMovements();
},
    
//BAWL.Movement. class that stores all movePaths of a specific movement(e.g 'walk')
selectMovement: function(m) {
    this.char.curMovement = this.char.movements[m];
    this.movement = this.char.curMovement;
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
        console.log("t - " + t);
        console.log(this.movement);
    }
},

selectSprite: function(s) {
    console.warn("-------------------selectSprite - REMOVING THIS---------------------");
},

    
    

    

    
setSpriteOffset(pos) {
    pos.sprite.offset.x = pos.x;
    pos.sprite.offset.y = pos.y;
    pos.sprite.offset.rotation = pos.rotation;
    console.log("---------------setSpriteOffset - REMOVING THIS-----------------------------");
},
    
createStepEditor() {
    sEditor = $("#stepEditor");
    
    sEditor.html("");
    var ps;
    var degrees;
    for (var i in this.movement.sprites) {
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
    
    updateEditorCallbacks();
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
    console.log("update vals:");
    console.log(this.tStep);
},
  
updatePosition: function() {
    console.log(this.tStep);
    for (i in this.tStep.positions) {
        this.tStep.positions[i].x = Number($("#xVal-" + i).val());
        this.tStep.positions[i].y = Number($("#yVal-" + i).val());
        this.tStep.positions[i].rotation = Number(($("#rotVal-" + i).val() / 180) * Math.PI);
    }
    this.movement.setStep(this.char, this.tStep);
    
},
    
    

makeDownloadLink: function() {
    var data = "text/json;charset=utf-8," + encodeURIComponent(this.movement.jsonPositions($("#nameInput").val()));
    console.log(data);
    $("#aniBtns a").empty();
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
    newStep = new BAWL.step(Number(prompt("Enter time in MS for new step:")), this.movement);
    for (var i in this.movement.sprites) {
        console.log(i);
        newStep.positions[i] = new Phaser.Point(0, 0);
        newStep.positions[i].rotation = 0;
        newStep.positions[i].sprite = this.movement.sprites[i];
    }
    console.log("newStep() - " );
    console.log(newStep);
    this.movement.steps.push(newStep);
    this.populateTimeSteps();
},
    
addSprite: function() {
    var i = Number($("#addSpriteOpt").val());
    $("#selectBox option[value='option1']").remove();
    
    $("#addSpriteOpt option[value='" + i + "']").remove();
    this.movement.sprites[i] = this.char.parts.children[i];
    this.movement.addSprite(this.char.parts.children[i]);
    console.log(this.movement.sprites);
    this.createStepEditor();
    this.updateVals();
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
        if (this.movement.sprites[i] == null) {
            $("#addSpriteOpt").append("<option value=" + i + ">" + this.char.parts.children[i].name + "</option>");
        }
    }
    
},
closeSpriteDialog: function() {
    $("#spriteDialog").css("display", "none");
},
    
    
    
    
    
    
    
copyPositions: function() {
    
    $(".cPosOpt").css("display", "none");
    console.log($(".cPosOpt"));
},

copyPosMenu: function() {
    $(".cPosOpt").css("display", "inline-block");
    
    $("#cPosMoveOpt").html("");
    for (var i in this.char.movements) {
        $("#cPosMoveOpt").append("<option value=" + Number(i) + ">" + this.char.movements[i].name + "</option>");
    }
},
    
copyMoveSelect: function(v) {
    
    $("#cPosStepOpt").html("");
    for (var i in this.char.movements[v].steps) {
        $("#cPosStepOpt").append("<option value=" + i + ">" + this.char.movements[v].steps[i].time + "</option>");
    }
},
    
copyStepSelect: function(v) {

},
    
copyPosClick: function() {
    
    var s = this.char.movements[Number($("#cPosMoveOpt").val())].steps[Number($("#cPosStepOpt").val())];
    
    if (this.movement != null) {
        for (var i in s.movement.sprites) {
            if (this.movement.sprites[i] == null) {
                this.movement.addSprite(s.movement.sprites[i]);
            }
        }
    } else {
        console.warn("copyStepSelect() - this.movement is null!");
    }
    
    if (this.tStep != null) {
        for (var i in s.positions) {
            if (this.tStep.positions[i].sprite != s.positions[i].sprite) {
                console.warn("copyStepSelect() - sprites in position " + i + " do not match!");
            } else {
                this.tStep.positions[i].x = s.positions[i].x;
                this.tStep.positions[i].y = s.positions[i].y;
                this.tStep.positions[i].rotation = s.positions[i].rotation;
            }
        }
    } else {
        console.warn("copyStepSelect() - tStep is null!");
    }
    
    this.updateVals();
}


    
    
};
    










