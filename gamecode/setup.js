$(document).ready(function(){
    $('#charDropdown').change(
        function(){
            AnimationEditor.selectChar($("#charDropdown").val());
        }
    );
    
    $("#movementDropdown").change(
        function() {
            AnimationEditor.selectMovement($("#movementDropdown").val());
        }
    );
    
    $("#timestepDropdown").change(
        function() {
            AnimationEditor.selectTimestep($("#timestepDropdown").val());
        }
    );
    
    $("#spriteDropdown").change(
        function() {
            //AnimationEditor.selectSprite($("#spriteDropdown").val());
        }
    );
    
    

    
});

function updateEditorCallbacks() {
        $(".pVal").change(
        function(data) {
            console.log("change: ");
            console.log(data.target.value);
            AnimationEditor.updatePosition();
        }
    );
}