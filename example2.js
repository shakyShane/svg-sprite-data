var xml2js   = require('xml2js');
var fs       = require("vinyl-fs");
var util     = require("gulp-util");
var through2 = require("through2");
var rimraf   = require("rimraf");
var builder  = require("./lib/builder");
var parser   = require("./lib/parser");
var config   = require("./lib/config");

fs.src("./test/fixtures/inputs/arr-black.svg")
    .pipe(through2.obj(function (file, enc, cb) {
        var stream = this;
        //console.log(file);
        parser(file._contents.toString(), function (err, result) {
            var out = builder(result, file, config());
            stream.push(new util.File({
                cwd: "/",
                base: "/",
                path: "/" + require("path").basename(file.path),
                contents: new Buffer(out.string)
            }));
            stream.push(new util.File({
                cwd: "/",
                base: "/",
                path: "/" + require("path").basename(file.path) + ".json",
                contents: new Buffer(JSON.stringify(result, null, 4))
            }));
            cb();
        });
    }))
    .pipe(fs.dest("./out"));

//var xml = fs.readFileSync("./test/fixtures/fb.svg", "utf-8");
//console.log(xml);
//console.log("");
//var parser = new xml2js.Parser();
//parser.parseString(xml, function (err, result) {
//    fs.writeFileSync("./out.json", JSON.stringify(result, null, 4));
//    var builder = new xml2js.Builder();
//    var xml = builder.buildObject(result);
//    fs.writeFileSync("./test/fixtures/fb-mid.svg", xml);
//});

//var fs = require('fs'),
//    xml2js = require('xml2js');
//
//var obj = {name: "Super", Surname: "Man", age: 23};

