var xml2js = require('xml2js');
var attrTransforms = require("./attrTransforms");
var traverse = require("traverse");

/**
 * @param obj
 * @returns {void|*|number}
 */
function stripsAttrs(obj, blacklist) {
    return traverse(obj).forEach(function (node) {
        var item = this;
        if (this.level === 1) {
            return;
        }
        blacklist.forEach(function (attr) {
            if (node[attr] && this.level !== 1) {
                delete node[attr];
                item.update(node, true);
            }
        });
    });
}

module.exports = function (obj, file, config) {
    obj.svg.$ = doTransformsOnNode(obj.svg.$, attrTransforms, file, config);
    obj = stripsAttrs(obj, config.get("attrBlacklist"));
    return {
        string: buildOne(obj),
        data:   obj
    };
};

/**
 * @param node
 * @param transforms
 * @param file
 * @param config
 * @returns {{}}
 */
function doTransformsOnNode(node, transforms, file, config) {
    var clean = removeRootAttrs(node, file, config);
    var out = {};
    Object.keys(clean).forEach(function (key) {
        var fn = transforms[key];
        if (fn) {
            out[key] = fn(node[key], file, config);
        } else {
            out[key] = node[key];
        }
    });
    return out;
}

/**
 * @param obj
 * @returns {*}
 */
function buildOne(obj) {
    return new xml2js.Builder({
        headless: true
    }).buildObject(obj);
}

/**
 * @param node
 * @param file
 * @param config
 * @returns {*}
 */
function removeRootAttrs(node, file, config) {
    return stripsAttrs(node, config.get("rootAttrBlacklist"));
}

module.exports.doTransformsOnNode = doTransformsOnNode;
module.exports.buildOne = buildOne;