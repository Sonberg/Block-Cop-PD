pc.script.create('video', function (app) {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    // Creates a new Video instance
    var Video = function (entity) {
        this.entity = entity;
    };

    Video.prototype.basicSetup = function() {
        window.global.videoObj = this;
        
        this.intro = document.getElementById('intro');
        this.main = document.getElementById('main');
        this.videoDiv = document.getElementById('video');
    };
    
    Video.prototype.playIntroVideo = function() {
       this.basicSetup();
        
       if( isMobile.any() ) {
           this.hide();
       } else {
           // Start screen for desktop
           this.videoDiv.style.display = 'block';

            var asset = app.assets.get(3056401);
            var source = document.createElement('source');

            source.setAttribute('src', asset.file.url);
            source.setAttribute('type', "video/mp4");

            this.intro.style.display = "block";
            this.intro.appendChild(source);
            this.intro.play();

           setTimeout(this.hide, 92730);
           return true;
        }
    };

    Video.prototype.playMainVideo = function() {
        this.videoDiv.style.display = 'block';

        var asset = app.assets.get(3056400);
        var source = document.createElement('source');

        source.setAttribute('src', asset.file.url);
        source.setAttribute('type', "video/mp4");

        this.main.style.display = "block";
        this.main.appendChild(source);
        this.main.play();

        document.getElementsByClassName('close')[0].addEventListener("click", function() {
            window.global.uiObject.changeScene();
            window.global.videoObj.hide();
            clearTimeout(movie);

        }, true);

        var movie = setTimeout(function() {
            window.global.videoObj.hide();
            window.global.uiObject.changeScene();
        }, 29770);

    };

    Video.prototype.hide = function() {
        window.global.videoObj.intro.pause();
        window.global.videoObj.main.pause();
        window.global.videoObj.videoDiv.style.display = 'none';
    };
    

    return Video;
});