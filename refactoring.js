// Accessing player
pc.script.attribute('player', 'entity', null, {
    displayName: 'Target'
});

// Getting road-entitiy for cloning
pc.script.attribute("map", "entity", null);

pc.script.create('refactoring', function (app) {
    var entities = [];
    var e;
    
    // Creates a new Refactoring instance
    var Refactoring = function (entity) {
        
        // Setting up basic settings
        this.entity = entity;
        this.setPositionZ = -500;
        this.round = 0;
        this.maxRound = 7;
    };

    Refactoring.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.checkScene();
            
        },
        
        loop: function() {
            while(this.round < this.maxRound) {
                this.add();
            }
        },

        reset: function () {
            var i = 0;
            for(i; i < entities.length; i++) {
                entities[0].destroy();  
                entities.splice(0, 1);
            }
            this.round = 0;
            this.setPositionZ = -500;
            this.checkScene();
        },
        
        checkScene: function() {
            if(window.global.scene === 'city') {
                this.scene = app.root.findByName('city');
            } else {
                this.scene = app.root.findByName('desert');
            }
            this.loop();
        },
        
        // Adding ground and road
        environment: function() { 
            e = this.scene.clone(); 
            
            // Cloning the current road-object
            e.setLocalPosition(window.global.scenePos, 0, this.setPositionZ);
            
            // Updating physics to the new clone
            e.getChildren()[1].rigidbody.syncEntityToBody();
            
            // Add it as a sibling to root
            app.root.addChild(e);
            
            // Call prepare-method
            this.prepare();
            
            return e;
        },      
        
        // Updating triggers for next round
        prepare: function() {
            this.setPositionZ -= 500;
        },
        add: function() {
              entities.push(this.environment());
              this.round++;
        }
    };

    return Refactoring;
});