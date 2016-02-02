pc.script.create('global', function (app) {
    // Creates a new Global instance
    var Global = function (entity) {
        this.entity = entity;
        window.global = this;
        this.isPaused = true;
        this.uiObject = null;
    };

    Global.prototype = {
        
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.lifeColor = {
                green: '#2CC990',
                blue : '#2C82C9',
                yellow: '#EEE657',
                orange: '#FCB941',
                red: '#FC6042'
            };
            
            //
            // Entities
            //
            this.uiEntity = app.root.findByName('ui');
            
            //
            // Scripts
            //
            this.refactScript = app.root.findByName('refactoring').script.refactoring;
            this.moveScript = app.root.findByName('move').script.move;
            this.soundScript = app.root.findByName('sound').script.sound;
            this.playerScript = app.root.findByName('player').script.player;
            this.uiScript = app.root.findByName('ui').script.ui;
            this.userScript = app.root.findByName('user').script.user;
            this.stopWatchScript = app.root.findByName('stopwatch').script.stopwatch;
            
            //
            // Global variables
            //
            this.scene = 'city';
            
            //
            // Starting functions
            //
            this.mapSetup();
        },
        
        
        mapSetup: function() {           
            if (this.scene === 'city') {
                this.player = app.root.findByName('city-player');
                this.scenePos = 0;
            } else {
                this.player = app.root.findByName('desert-player');
                this.scenePos = 200; 
            }
            
            this.moveScript.reset();
            this.playerScript.reset();
            this.refactScript.reset();
            //this.uiScript.reset();
        }
    };

    return Global;
});