$(document).ready(function(){
    $('#charDropdown').change(
        function(){
            AnimationEditor.selectChar($("#charDropdown").val());
        }
    );
    
    $("#movementDropdown").change(
        function() {
            AnimationEditor.selectMovement($("#movementDropdown").val())
        }
    );
    
});