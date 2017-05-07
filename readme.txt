
Player
 Attack
  Movement
  Create Effect/Sprite
  Start cooldown
  Apply Side-effects


Movement
 >End
  Callback


Player
 ability[1-8]
	>Link Hotkeys to abilities
Play
 Hotkeys


hotkeys = Phaser.Key array [1-8]
	>key/ability array indices match
player.abilities array [1-8]

if Key[i].isDown
 player.cast(i); //returns success


Player Cast:
 success = Ability[i].cast(); //returns whether or not ability can be/is cast 

Ability Cast:
 

Ability Object:
 :isInstant //0 = do animation, set onAnimationFinish callback to the ability function. 1=instant, call ability function and animation if !=null
 :name
 :char
 :abilityFunction(this, params[]) //a function that contains the logic for the actual abilities action/effects
 _________
 Ability Functions
  //a collection of ability functions, both specific and generic. Every ability will have an ability function that contains the logic of 
    doing the ability, creating any spell/projectile objects, triggering movements in parent, applying side-effects, etc.

______________________________
Create Ability class
Add abilities and cast function to player
find/create spell graphic with animation
create a simple ability to test and tune

















