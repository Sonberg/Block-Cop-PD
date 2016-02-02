pc.script.create('user', function (app) {
    // Creates a new User instance
    var User = function (entity) {
        this.entity = entity;
    };

    User.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            window.global.uiScript.nameInput.value = window.global.userScript.checkCookie();
        },
        
        
        checkCookie: function() {
            return this.getCookie();
        },

        getCookie: function () {
            var nameEQ = "username" + "=";
            var ca = document.cookie.split(';');
            console.log(ca.length);
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) === 0) {
                    window.global.uiScript.startButton.removeAttribute('disabled');
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return null;
        },
        
        setCookie: function(value) {
            var date = new Date();
            date.setTime(date.getTime()+(30*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
            document.cookie = "username"+"="+value+expires+"; path=/";
            console.log(this.getCookie());
        }
    };

    return User;
});