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
    
    //$("#timestepDropdown").click(
    //    function() {
    //        console.log("timestep ----- click");
    //        AnimationEditor.selectTimestep($("#timestepDropdown").val());
    //    }
    //);
    
    $("#spriteDropdown").change(
        function() {
            AnimationEditor.selectSprite($("#spriteDropdown").val());
        }
    );
    
    updateEditorCallbacks();

    
});

function updateEditorCallbacks() {
    $(".pVal").change(
        function(data) {
            console.log("change: ");
            console.log(data.target.value);
            AnimationEditor.updatePosition();
            console.log("pval CHANGE-----");
        }
    );
    
    $(".pVal").click(
        function(data) {
            console.log("change: ");
            console.log(data.target.value);
            //AnimationEditor.updatePosition();
        }
    );
}