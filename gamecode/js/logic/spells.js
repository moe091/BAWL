BAWL.spells = {
    icewall: function(player) {
        var point = player.getPoint(0, -100);
        var spell = game.add.sprite(point.x, point.y, "icewall");
        spell.anchor.setTo(0.5, 0.5);
        
        game.physics.p2.enable(spell);
        spell.body.static = true;
        spell.body.fixedRotation = true;
        spell.body.rotation = player.head.body.rotation;
        spell.rotation = player.head.body.rotation;
        console.log("sprite: " + player.head.rotation);
        console.log("body: " + player.head.body.angle);
        BAWL.gameWorld.playerCollide.add(spell);
        
        var cast = spell.animations.add("cast");
        cast.onComplete.add(function(sprite, animation) {
            setTimeout(function() {
                sprite.destroy();
            }, 750);
        }, this);
        
        spell.animations.play("cast", 20, false);
    }
}