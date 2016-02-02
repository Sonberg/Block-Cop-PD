pc.script.create('move', function (app) {
    var force = new pc.Vec3();
    var p;
    
    // Touch
    var firstX;
    var lastX;
    
    var firstY;
    var lastY;
    
    // Creates a new Move instance
    var Move = function (entity) {
        this.entity = entity;
        this.force = new pc.Vec3();
    };
    
    Move.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.player = window.global.player;
            this.speed = 0.9;
            
            //
            // Mobile eventhandler
            // Grab the canvas
            //
           
            var canvas = document.getElementById('application-canvas');
            
            // listen for touches
            window.addEventListener('touchstart', function(e) {
                console.log(e);
                 firstX = e.touches[0].clientX; //get X position of current touch
                 firstY = e.touches[0].clientY; //get Y position of current touch
                
            }, false);
            window.addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
            window.addEventListener('touchend', function(e) {
                lastX = e.changedTouches[0].clientX; //get X position of last place touched
                lastY = e.changedTouches[0].clientY; //get Y position of last place touched
                
                if(firstX > lastX) {
                    window.global.moveScript.turnLeft();
                } else {
                    window.global.moveScript.turnRight();    
                }
            }, false);

           
            // Keybord eventhandler
            app.keyboard.on(pc.EVENT_KEYDOWN, this.keydown, this);
            
        },
        
        reset: function() {
            this.player = window.global.player;
            this.speed = 0.9;
        },
        
        // Event handler for desktop
        keydown: function(event) {  
            if(!window.global.isPaused) {
                switch(event.key) {
                    case (pc.KEY_LEFT):
                        window.global.moveScript.turnLeft(); 
                        break;
                    case (pc.KEY_RIGHT):
                        window.global.moveScript.turnRight(); 
                        break;
                        
                    case (pc.KEY_UP):
                        window.global.moveScript.speed += 0.1;
                        break;
                    case (pc.KEY_DOWN):
                        window.global.moveScript.speed -= 0.1;
                        break;                       
                }
            }            
        },
        
        turnLeft: function() {
            if(window.global.player.getPosition().x === -4.5) {
                return true;
            }
            window.global.moveScript.rotate(10);
            window.global.moveScript.teleport(-4.5, p);  
        },
        
        turnRight: function() {
            if(window.global.player.getPosition().x === 4.5) {
                return true;
            }
            window.global.moveScript.rotate(-10);    
            window.global.moveScript.teleport(4.5, p);
        },
        
        // Moving player
        teleport: function (x, p) {
            this.player.setLocalPosition(x + window.global.scenePos, p.y, p.z);
            this.player.rigidbody.syncEntityToBody();
        },
        
        // Rotate player
        rotate: function(degree) {
            this.player.setLocalEulerAngles(0, degree, 0);
            this.player.rigidbody.syncEntityToBody();
            setTimeout(window.global.moveScript.rotateReset, 250);
        },
        
        // Reset rotating 
        rotateReset: function() {
            window.global.player.setLocalEulerAngles(0, 0, 0);
            window.global.player.rigidbody.syncEntityToBody();
            
        }, 

        // Called every frame, dt is time in seconds since last update
        // Moving player forward
        postUpdate: function (dt) {
            p = this.player.getPosition(); 

            
            if(window.global.isPaused) {
                this.player.setLocalPosition(p.x, p.y, p.z);     
            } else {  
                this.player.setLocalPosition(p.x, p.y, p.z - this.speed);
            }

        }
    };

    return Move;
});