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
    
    
    
    //____________________________________COPY STEP OPTIONS____________________________________\\
    $("#cPosMoveOpt").change(
        function() {
            AnimationEditor.copyMoveSelect($("#cPosMoveOpt").val());
        }
    );
    
    $("#cPosStepOpt").change(
        function() {
            AnimationEditor.copyStepSelect($("#cPosStepOpt").val());
        }
    );

    
});

function updateEditorCallbacks() {
    $(".pVal").change(
        function(data) {
            AnimationEditor.updatePosition();
            console.log("pval CHANGE-----");
        }
    );
    
    $(".pVal").click(
        function(data) {
            AnimationEditor.updatePosition();
        }
    );
}