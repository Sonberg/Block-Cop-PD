// How far from the entity should the follower be
pc.script.attribute('distance', 'number', 2);

// Script Definition
pc.script.create('topCamera', function (app) {
    
    // Creates a new Follow instance
    var topCamera = function (entity) {
        this.entity = entity;
        this.vec = new pc.Vec3();
        this.alpha = 0.2;
    };
    
    topCamera.prototype = {   
        // Called once after all resources are loaded and before the first update
        initialize: function () {   
            this.entity.setPosition(window.global.scenePos, 0, 0);
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
                                        
            // get the position of the target entity
            var pos = window.global.player.getPosition();
            
            // calculate the desired position for this entity
            pos.x = 0 + window.global.scenePos;
            pos.y += 45 * this.distance;
            pos.z -= 25;
            
            
            // smoothly interpolate towards the target position
            this.vec.lerp(this.vec, pos, this.alpha);
            
            // set the position for this entity
            this.entity.setPosition(this.vec); 
        }
    };

    return topCamera;
});