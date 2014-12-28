var Immutable = require("immutable");

var defaults = {
    svgId: "%f",
    attrBlacklist: ["xmlns:xlink", "xmlns", "xml:space"]
};

module.exports = function merge (config) {
    return Immutable.fromJS(defaults).mergeDeep(config);
};