var SpriteData = require("./index");
var fs  = require("fs");

var config = {
    common: "icon",
    dims: true,
    layout: "diagonal",
    render: {
        css: true
    }
};

var spriter = new SpriteData(config);

var svg = fs.readFileSync("./test/fixtures/fb.svg", "utf-8");

spriter.add("fb.svg", svg).compile(function (err, svg) {
    console.log(svg);
});