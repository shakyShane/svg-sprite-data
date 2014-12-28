var fs = require("fs");
var template = __dirname + "/../templates/sprite.svg";

var Sprite = function () {
    this.items = [];
};

Sprite.prototype.add = function (obj) {
    this.items.push(obj);
    return this;
};

Sprite.prototype.compile = function () {
    return fs
        .readFileSync(template, "utf8")
        .replace("%output%", this.items.reduce(function (all, item, i) {
            return all + (i ? "\n" : "") + item.string;
        }, ""));
};

module.exports = Sprite;