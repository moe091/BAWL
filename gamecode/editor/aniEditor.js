
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
    if ($("#inputRad").val(":checked") == false) {
        game.input.enabled = false;
    }
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
},
    
createStepEditor() {
    sEditor = $("#stepEditor");
    
    sEditor.html("");
    var ps;
    var degrees;
    
    sEditor.append("<input type='radio' name='spriteRad' value=-1 id='inputRad' onclick='AnimationEditor.sRadClick(-1)'> None");
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
        
            $("#coordEdit-" + i).append("<span class='spriteRadSpan radSpan-" + i + "' onclick='AnimationEditor.sRadClick(" + i + ")'" + ">");
                $(".radSpan-" + i).append("<input type='radio' name='spriteRad' value=" + i + ">" + ps.name);
            $("#coordEdit-" + i).append("</span>");
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
},
  
updatePosition: function() {
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
    this.movement.steps.push(newStep);
    this.populateTimeSteps();
},
    
addSprite: function() {
    var i = Number($("#addSpriteOpt").val());
    $("#selectBox option[value='option1']").remove();
    
    $("#addSpriteOpt option[value='" + i + "']").remove();
    this.movement.sprites[i] = this.char.parts.children[i];
    this.movement.addSprite(this.char.parts.children[i]);
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
},
    
sRadClick: function(n) {
    if (n != -1) {
        this.selectedSprite = this.movement.sprites[n];
        this.spriteIndex = n;
    } else {
        this.selectedSprite = null;
        this.spriteIndex = n;
    }
},
    
    
    
    
    
    
    
//_____________________________________________UPDATE_____________________________________________\\
uDown: 0,
rDown: 0,
dDown: 0,
lDown: 0,
moveVal: 1,
update: function() {
    if (this.wasd.f.isDown) {
        this.moveVal = 3;
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFF");
    } else {
        this.moveVal = 1;
    }
    if (this.wasd.up.isDown) {
        //ADD OPTION IN AniEditor UI TO SELECT BODY PART.
        //MOVE THE SELECTED BODY PART UP
        //IF SHIFT IS HELD, MOVE IT IN INCREMENTS OF 5
        //IF ALT IS HELD, ROTATE INSTEAD
        //IF CTROL IS HELD, ROTATE BACKWARDS 
        console.log("UP");
        if (this.uDown == 0) {
            if (this.spriteIndex != -1 && this.tStep != null) {
                this.tStep.positions[this.spriteIndex].y-= this.moveVal;
                this.updateVals();
                this.movement.setStep(this.char, this.tStep);
                console.log("MOVE SPRITE UP - " + this.moveVal);
            }
            this.uDown = game.time.now;
        }
        console.log("dif: " + (game.time.now - this.tDown));
        if (game.time.now - this.uDown > 100) {
            this.uDown = 0;
        }
    } else { this.uDown = 0; }
    
    if (this.wasd.right.isDown) {
        if (this.rDown == 0) {
            if (this.spriteIndex != -1 && this.tStep != null) {
                this.tStep.positions[this.spriteIndex].x+= this.moveVal;
                this.updateVals();
                this.movement.setStep(this.char, this.tStep);
            }
            this.rDown = game.time.now;
        }
        if (game.time.now - this.rDown > 100) {
            this.rDown = 0;
        }
    } else { this.rDown = 0; }
    
    if (this.wasd.down.isDown) {
        if (this.dDown == 0) {
            if (this.spriteIndex != -1 && this.tStep != null) {
                this.tStep.positions[this.spriteIndex].y+= this.moveVal;
                this.updateVals();
                this.movement.setStep(this.char, this.tStep);
            }
            this.dDown = game.time.now;
        }
        if (game.time.now - this.dDown > 100) {
            this.dDown = 0;
        }
    } else { this.dDown = 0; }
    
    if (this.wasd.left.isDown) {
        if (this.lDown == 0) {
            if (this.spriteIndex != -1 && this.tStep != null) {
                this.tStep.positions[this.spriteIndex].x-= this.moveVal;
                this.updateVals();
                this.movement.setStep(this.char, this.tStep);
            }
            this.lDown = game.time.now;
        }
        if (game.time.now - this.lDown > 100) {
            this.lDown = 0;
        }
    } else { this.lDown = 0; }
},
createWASD: function() {
    this.wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        f: game.input.keyboard.addKey(Phaser.Keyboard.F),
    };
}


    
    
};
    










