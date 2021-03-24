var Rocket = /** @class */ (function () {
    function Rocket(code, engines, position) {
        this.engines = new Array();
        this.code = code;
        this.engines = engines;
        this.position = 0;
    }
    Rocket.prototype.printRocket = function () {
        var showRocket = "\n            <p>Rocket " + this.code + " boosters max power " + this.engines + "</p>\n        ";
    };
    return Rocket;
}());
