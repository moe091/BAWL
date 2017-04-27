
var AnimationEditor = {

aniEditor: null,
chars: null,  
char: null,
movement: null,
    
editMode: function() {
    game.paused = true;
    game.input.enabled = false;

    this.aniEditor.style.backgroundColor = "#1a1a1a";

    this.populateChars(BAWL.gameWorld.chars);
},

unpause: function() {
    game.input.enabled = true;
    game.paused = false;
    this.aniEditor.style.backgroundColor = "#000000";
},

populateChars: function(charList) {
    this.chars = charList;
    $("#charDropdown").html("");
    for (var i = 0; i < charList.length; i++) {
        $('#charDropdown').append('<option value='+i+'>'+ charList[i].name +'</option>');
    }
    $('#charDropdown').append('<option value='+i+'>'+ "testoption" +'</option>');
    this.selectChar($("#charDropdown").val());
},
    
populateMovements: function() {
    $("#movementDropdown").html("");
    for (i in this.char.movements) {
        $("#movementDropdown").append('<option value='+i+'>'+ this.char.movements[i].name +'</option>');
    }
    this.selectMovement($("#movementDropdown").val())
},
    
populateSprites: function() {
    console.log(this.movement);
    $("#spriteDropdown").html("");
    for (i in this.movement.movePaths) {
        $("#spriteDropdown").append('<option value=' + i + '>' + this.movement.movePaths[i].sprite.name + '</option>');
    }
},
    

    
selectChar: function(c) {
    this.char = this.chars[c];
    this.populateMovements();
},
    
selectMovement: function(m) {
    this.movement = this.char.movements[m];
    this.populateSprites();
}
    
    
    

};
    