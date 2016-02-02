pc.script.create('player', function (app) {
    
    // Creates a new Player instance
    var Player = function (entity) {
        this.entity = entity;
    };
    

    Player.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.reset();
        },
        
        reset: function() {
            this.player = window.global.player;
            this.player.collision.on("collisionstart", this.collision, this);
        },
        
        collision: function(obj) { 
            switch(obj.other.name) {
                case 'cone':
                    window.global.uiEntity.script.ui.life(-2);
                    break;
                case 'road-work':
                    window.global.uiEntity.script.ui.life(-3);
                    break;
                case 'jeep':
                    window.global.uiEntity.script.ui.life(-3);
                    break;
                case 'lego_barrier':
                    window.global.uiEntity.script.ui.life(-2);
                    break;
               case 'oildrum':
                    window.global.uiEntity.script.ui.life(-2);
                    break;
               case 'bus':
                    window.global.uiEntity.script.ui.life(-5);
                    break;
               case 'car':
                    window.global.uiEntity.script.ui.life(-3);
                    break;
                default:
                    break;
            }
            
            switch(window.global.uiEntity.script.ui.score) {
                case 10:
                    this._updateBar('green'); 
                    break;
                case 9:
                    this._updateBar('green'); 
                    window.global.soundScript.playHitSound(); 
                    break;
                case 8:
                    this._updateBar('blue');
                    window.global.soundScript.playHitSound(); 
                    break;
                case 7:
                    this._updateBar('blue');
                    window.global.soundScript.playHitSound(); 
                    break;
                case 6:
                    this._updateBar('yellow'); 
                    window.global.soundScript.playHitSound(); 
                    break;
                case 5:
                    this._updateBar('yellow'); 
                    window.global.soundScript.playHitSound(); 
                    break;
                case 4:
                    this._updateBar('orange');
                    window.global.soundScript.playHitSound(); 
                    break;
                case 3:
                    this._updateBar('orange');
                    window.global.soundScript.playHitSound(); 
                    break;
                case 2:
                    this._updateBar('red');
                    window.global.soundScript.playHitSound(); 
                    break;
                case 1:
                    this._updateBar('red');
                    window.global.soundScript.playHitSound(); 
                    break;
                case 0:
                    window.global.uiEntity.script.ui.gameOver();
                    window.global.soundScript.playCrashSound(); 
                    break;
                default:
                    window.global.uiEntity.script.ui.gameOver();
                    window.global.soundScript.playCrashSound(); 
                    break;
            }
       },
        _updateBar: function(color) {
            document.getElementById('fill').style.background = window.global.lifeColor[color];
        }
    };

    return Player;
});