BAWL.loader = {
  

    loadAnimation: function(char, name, callback, context) {
        $.getJSON("../../data/animations/" + char + "/" + name + ".json", function(json) {
            
            callback(json, context, name);
        });
    }
};
