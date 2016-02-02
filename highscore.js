pc.script.create('changeScene', function (app) {
    // Creates a new ChangeScene instance
    var ChangeScene = function (entity) {
        this.entity = entity;
    };

    ChangeScene.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.collision.on('triggerenter', this.finnish, this);
            
           // this.changeBtn.addEventListener('click', this.change, false);
        },
        
        finnish: function() {
            window.global.isPaused = true;
            window.global.uiObject.toggleHud();
            document.getElementById('goal-menu').style.display = 'block';
            window.global.uiScript.finnishTime();
            window.global.uiScript._toggle('settings', 'show');
            this.syncToHighScore();
        },
        
        syncToHighScore: function() {
            var time = window.global.stopWatchScript.formatted();
            var data = {username: window.global.userScript.getCookie(), time: time, map: window.global.scene};
            console.log(data);
            
        },
        
        fetchHighScore: function() {
            
        }
    };
    
    ChangeScene.prototype.change = function() {
        
    };

    return ChangeScene;
});