var transforms = exports;
var path       = require("path");

transforms["id"] = function (id, file, config) {
    return config.get("svgId").replace("%f",
        path.basename(file.path)
            .replace(path.extname(file.path), "")
    );
};