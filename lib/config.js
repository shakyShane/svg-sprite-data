var Immutable = require("immutable");

var defaults = {
    svgId: "%f"
};

module.exports = function merge (config) {
    return Immutable.fromJS(defaults).merge(config);
};