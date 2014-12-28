var Immutable = require("immutable");

var defaults = {
    svgId: "%f",
    attrBlacklist: ["xmlns:xlink", "xmlns", "xml:space", "version"],
    nodeBlacklist: ["id"]
};

module.exports = function merge (config) {
    return Immutable.fromJS(defaults).mergeDeep(config);
};