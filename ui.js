pc.script.create('ui', function (app) {
     var canvasWidth = document.getElementById('application-canvas').offsetWidth;
    
    // Creates a new Ui instance
    var Ui = function (entity) {
        this.entity = entity;
        this.score = 10;
        this.distance = 0;
    };

    Ui.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            // Append UI-files
            this._appendStyle(3057493);
            this._appendHtml(3057494);
            
            // Life bar
            this.lifeDiv = document.getElementById('fill');
            
            // Distance
            this.progressHud = document.getElementById('progress');
            this.timeHud = document.getElementById("time");
            this.finalTime = document.getElementsByClassName("time-final");
            this.distanceHud = document.getElementById('distance');
            
            // User input
            var resetButton = document.getElementsByClassName('reset');
            this.startButton = document.getElementById('start');
            this.nameInput = document.getElementById("name");
            this.mapList = document.getElementById("select-list");
            
            
            // Settings
            this.showSettingsDiv = document.getElementById('settings');
            
            // Checking and setting position
            this.changeMap();
            window.global.uiObject = this;
            
            //Mobile navigation
            this.mobileNav = document.getElementById("mobile");
          
            // Event listner
            // Hud navigation
            resetButton[0].addEventListener("click", this.restart, true);
            resetButton[1].addEventListener("click", this.restart, true);
            this.startButton.addEventListener("click", this.start, true);
            this.nameInput.addEventListener("keyup", this._nameInputField, true);
            this.mapList.addEventListener("change", this.changeMap, true);
             
            window.global.uiScript.nameInput.value = window.global.userScript.checkCookie();
        },
        
        update: function(dt) {
            //console.log(this.startTime - new Date());
            this.updateHud();
        },
        
        // Lägg till CSS-Hud fil
        _appendStyle: function(id) {
            var asset = app.assets.get(id);
            var link = document.createElement("link");
            link.href = asset.file.url;
            link.type = "text/css";
            link.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(link);   
        },
        
        // Lägg till HTML-Hud fil
        _appendHtml: function(id) {
            var asset = app.assets.get(id);
            var div = document.createElement('div');
            div.innerHTML = asset.resource || '';
            div.className = "wrapper";
            div.style.width = canvasWidth + 'px';
            document.body.appendChild(div);

            // when asset resource loads/changes,
            // update html of element
            asset.on('load', function() {
                div.innerHTML = asset.resource;
            });

            // make sure assets loads
            app.assets.load(asset);   
        },
        
        // Hide & show UI div
        _toggle: function(target, state) {
            var element = document.getElementById(target);

            if(state === 'hide') {
                element.style.display = 'none';        
            } else {
                element.style.display = 'block';
            }
            
            return true;
            
        },
        
        updateHud: function() {
            this.distance = window.global.startPosition - window.global.player.getLocalPosition().z;
            this.progressHud.innerHTML = Math.floor(this.distance) + 'm';
            var time = window.global.stopWatchScript.formatted();           
            this.timeHud.innerHTML = (time.m + ":" + time.s + "," + time.ms);
        },
        
        finnishTime: function() {
            var time = window.global.stopWatchScript.formatted();  
            for(var i = 0; i < this.finalTime.length; i++) {
                window.global.uiScript.finalTime[i].innerHTML = (time.m + ":" + time.s + "," + time.ms);
            }   
            
        }
    };
    
    Ui.prototype._nameInputField = function() {        
        if(window.global.uiScript.nameInput.value.length >= 2) {
            window.global.userScript.setCookie(window.global.uiScript.nameInput.value);
            window.global.uiScript.startButton.removeAttribute('disabled');
        }
    };
    
    // Hide or show hud-div
    Ui.prototype.toggleHud = function() {
        if(window.global.isPaused) {
            this._toggle('hud', 'show');
            this._toggle('game-hud', 'hide');
            window.global.soundScript.pauseEngine();
            
        } else {
            this._toggle('hud', 'hide');
            this._toggle('game-hud', 'show');
        }    
        
    };
    
    // Resetting life and distance
    Ui.prototype.reset = function() {
        window.global.startPosition = window.global.player.getLocalPosition().z;
        this.distance = 0;
        this.score = 10;
        this.lifeDiv.style.width = this.score*10 + '%';
        this.lifeDiv.style.background = window.global.lifeColor.green;
    };

    // Change life
    Ui.prototype.life = function (points) {
        this.score += points;
        this.lifeDiv.style.width = this.score*10 + '%';
    };
    
    // Start menu
    Ui.prototype.start = function () {
        window.global.uiScript.reset();
        window.global.uiScript.changeMap();
        window.global.uiScript.countDown();
        window.global.uiScript._toggle('start-menu', 'hide');
    },
    
    // Game over screen
    Ui.prototype.gameOver = function() {
        window.global.stopWatchScript.pause();
        window.global.uiScript.finnishTime();
        window.global.uiScript._toggle('settings', 'show');
        window.global.isPaused = true;
        window.global.uiScript.toggleHud();
        window.global.uiScript._toggle('game-over', 'show');
        this.distance = window.global.startPosition - window.global.player.getLocalPosition().z;
        this.distanceHud.innerHTML = Math.floor(this.distance) + 'm';
        this.score = 10;
    };  
    
    // Restart game
    Ui.prototype.restart = function () {
        window.global.player.setLocalPosition(4.5 + window.global.scenePos, 1.061, 481.69); 
        window.global.uiScript._toggle('game-over', 'hide');
        window.global.uiScript._toggle('goal-menu', 'hide');
        window.global.uiScript.changeMap();
        window.global.uiScript.countDown();
    };
    
    // Count down to start
    Ui.prototype.countDown = function() {
        window.global.stopWatchScript.reset();
        window.global.uiScript.reset();
        window.global.uiScript._toggle('game-hud', 'show');
        window.global.uiScript._toggle('hud', 'hide');
        window.global.uiScript._toggle('settings', 'hide');
        
        var timer = document.getElementById("count-down");
        window.global.uiObject._toggle("count-down", 'show');
        
        var cd = 3;
        var interval = setInterval(function()
        {
            timer.innerHTML = -- cd;
            if (cd === 0) {
                clearInterval(interval);
                timer.innerHTML = 3;
                window.global.isPaused = false;
                window.global.uiScript.toggleHud();
                window.global.uiScript._toggle("count-down", 'hide');
                window.global.soundScript.playEngine();
                window.global.stopWatchScript.start();
            }
        }, 1000);           
     };
    
    
    Ui.prototype.changeMap = function() {
            window.global.scene = window.global.uiScript.mapList.value.toLowerCase();
        
            // Resetting life
            window.global.uiScript.score = 10;

            // Move player
            window.global.player.setLocalPosition(4.5 + window.global.scenePos, 1.061, 481.69); 

            // Resetting game
            window.global.mapSetup();
        
        };

    return Ui;
});