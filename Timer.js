
function Timer() {
    if (!(this instanceof Timer))
        return new Timer();

    this.time = 0;
    this.interval = null;
}

Timer.prototype.setTime = function (time) {
    this.time = time;
}

Timer.prototype.start = function (callbackSecond, callbackEnd) {
    this.stop();
    var self = this;
    this.interval = setInterval(function () {
        self.time -= 1;
        callbackSecond( self.time );

        if (self.time <= 0) {
            self.time = 0;
            self.stop();
            callbackEnd();
        }
    }, 1000);
}

Timer.prototype.stop = function () {
    clearInterval(this.interval);
}

Timer.prototype.clean = function () {
    this.time = 0;
}


module.exports = Timer;
