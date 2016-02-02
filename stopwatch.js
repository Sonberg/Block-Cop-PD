pc.script.create('stopwatch', function (app) {
    // Creates a new Stopwatch instance
    var Stopwatch = function (entity) {
        this.entity = entity;
    };

    Stopwatch.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () { this.reset(); },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {}
    };

    Stopwatch.prototype.start = function () {
        if (this.pausedAt !== null) {
            this.paused += Date.now() - this.pausedAt;
            this.pausedAt = null;
        }
    };

    Stopwatch.prototype.pause = function () {
        if (!this.pausedAt) this.pausedAt = Date.now();
    };

    Stopwatch.prototype.reset = function () {
        var now = Date.now();
        this.startedAt = now;
        this.pausedAt = now;
        this.paused = 0;
    };

    Stopwatch.prototype.ticks = function () {
        var now = this.pausedAt || Date.now();
        return (now - this.startedAt) - this.paused;
    };

    Stopwatch.prototype.formatted = function () {
        var elapsed; // elapsed time 
        var h; // formatted hour
        var m; // formatted minute
        var s; // formatted seconds

        elapsed = new Date(this.ticks());
        h = elapsed.getUTCHours().toString();
        m = elapsed.getUTCMinutes().toString();
        s = elapsed.getSeconds().toString();
        ms = elapsed.getMilliseconds().toString();

        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        if (ms < 10) ms = '00' + ms;
        else if (ms < 100) ms = '0' + ms;

        return {
            h: h,
            m: m,
            s: s,
            ms: ms
        };
    };

    return Stopwatch;
});