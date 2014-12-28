var Immutable = require("immutable");

var defaults = {
    layout:            "vertical",
    svgId:             "%f",
    rootAttrBlacklist: ["xmlns:xlink", "xmlns", "xml:space", "version"],
    attrBlacklist:     ["id"]
};

module.exports = function merge(config) {
    return Immutable.fromJS(defaults)
        .mergeDeep(config)
        .withMutations(function (item) {
            item.update("rootAttrBlacklist", function (_item) {
                var layout = item.get("layout");
                var remove = "x";
                if (layout === "horizontal") {
                    remove = "y";
                }
                return _item.push(remove);
            });
        });
};