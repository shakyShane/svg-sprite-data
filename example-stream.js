var SpriteData   = require("./index");
var vfs          = require("vinyl-fs");
var through2     = require("through2");

var config = {
    common: "icon",
    dims: true,
    layout: "diagonal",
    render: {
        css: true
    }
};

function svgSprites(config) {

    var spriter = new SpriteData(config);

    return through2.obj(function (file, enc, cb) {

        // Add the file from the stream
        spriter.add(file.path, file.contents.toString());
        cb(null);

    }, function (cb) {

         // Compile
        spriter.compile(function (err, svg) {

            // use the data to create some in-memory files and throw em down stream
            console.log(svg);
            // cb(null, file);
        });

        return true;

    });
}

vfs.src(["test/fixtures/*.svg"])
    .pipe(svgSprites(config))
    .pipe(vfs.dest("test/output"));
