pc.script.create('sound', function (app) {
    // Creates a new Sound instance
    var Sound = function (entity) {
        this.entity = entity;
    };

    Sound.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.engineEntity = app.root.findByName('engine').audiosource; 
            this.hitEntity = app.root.findByName('hit').audiosource;
            this.crashEntity = app.root.findByName('crash').audiosource;          
        },
        
       playEngine: function() {
           this.engineEntity.play("242739__marlonhj__engine-1.wav");    
       },

       pauseEngine: function() {
           this.engineEntity.pause();
       },

       playHitSound: function() {
           this.hitEntity.play('hit.mp3');    
       },
        
       playCrashSound: function() {
           this.crashEntity.play('crash.wav');
           
       }
    };

    return Sound;
});