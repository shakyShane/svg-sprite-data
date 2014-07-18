var path         = require("path");
var sprite       = require("./lib/svg-sprite");
var fs           = require("fs");
var vfs          = require("vinyl-fs");
var _            = require("lodash");
var File         = require('vinyl');
var mustache     = require('mustache');
var pretemplater = require("pretemplater");

var config = {
    common: "svg-icon",
    selector: "icon-%f",
    dims: true,
    layout: "diagonal",
    svg: {
        file: "svg.svg",
        path: "%f"
    },
    css: {
        file: "css.css"
    },
    png: {
        path: "%f"
    },
    preview: {
        file: "preview.html"
    },
    render: {
        css: true
    }
};

var svgs = sprite.createSprite(config);

function svgSprites() {

    var tasks = {};
    var counter = 0;

    return require("through2").obj(function (file, enc, cb) {

        svgs.addFile(file.path, file.contents.toString(), counter, tasks);

        counter += 1;
        cb(null);

    }, function (cb) {

        var that = this;

        svgs._processFiles(tasks, function () {

            var svg = svgs.toSVG(false);
            var data = svgs.data;

            // Generate the file path to the SVG
            data.svgPath = config.svg.path.replace("%f", config.svg.file);

            if (config.png) {
                data.pngPath = config.png.path.replace("%f", config.svg.file.replace(/(\.svg)$/, ".png"));
            }

            data.cssPath = config.css.file;

            that.push(new File({
                cwd:  "./",
                base: "./",
                path: config.svg.file,
                contents: new Buffer(svg)
            }));

            var css     = mustache.render(fs.readFileSync(path.resolve("tmpl/sprite.css"), 'utf-8'), data);
//            var template = fs.readFileSync(path.resolve("tmpl/sprite.inline.svg"), 'utf-8');
//            console.log(pretemplater(template));
//            var inline  = _.template(pretemplater(template))(data);
            var preview = mustache.render(fs.readFileSync(path.resolve("test/tmpl/preview.html"), 'utf-8'), data);

//            that.push(new File({
//                cwd:  "./",
//                base: "./",
//                path: config.svg.file,
//                contents: new Buffer(inline)
//            }));

            that.push(new File({
                cwd:  "./",
                base: "./",
                path: config.css.file,
                contents: new Buffer(css)
            }));
//
            that.push(new File({
                cwd:  "./",
                base: "./",
                path: config.preview.file,
                contents: new Buffer(preview)
            }));

            cb(null);

            return true;

        });
    });
}

vfs.src(["test/fixtures/*.svg"])
    .pipe(svgSprites(config))
    .pipe(vfs.dest("test/output"));
