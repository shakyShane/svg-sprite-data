var xml2js = require('xml2js');
var fs = require("vinyl-fs");
var util = require("gulp-util");
var through2 = require("through2");
var rimraf = require("rimraf");
var builder = require("./lib/builder");
var parser = require("./lib/parser");
var merge = require("./lib/config");
var Sprite = require("./lib/Sprite");

fs.src("./test/fixtures/inputs/arr-black.svg")
    .pipe(spriter({
        svgId: "shane-%f"
    }))
    .pipe(fs.dest("./out"));

function spriter(opts) {
    var config = merge(opts);
    console.log(config);
    var sprite = new Sprite(config);
    return through2.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb();
        }
        parser(file._contents.toString(), file, config, function (err, result) {
            sprite.add(result);
            cb();
        });
    }, function (cb) {

        this.push(new util.File({
            cwd:      "/",
            base:     "/",
            path:     "/" + "out.svg",
            contents: new Buffer(sprite.compile())
        }));

        //stream.push(new util.File({
        //    cwd:      "/",
        //    base:     "/",
        //    path:     "/" + require("path").basename(file.path) + ".json",
        //    contents: new Buffer(JSON.stringify(result.data, null, 4))
        //}));
        cb();
    });
}

