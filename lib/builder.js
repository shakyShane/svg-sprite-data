var xml2js         = require('xml2js');
var attrTransforms = require("./attrTransforms");
var traverse       = require("traverse");

/**
 * @param obj
 * @returns {void|*|number}
 */
function stripsAttrs(obj, file, config) {
    var blacklist = config.get("nodeBlacklist");
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
    obj = stripsAttrs(obj, file, config);
    return {
        string: buildOne(obj),
        data: obj
    };
};

/**
 * @param node
 * @param transforms
 * @param file
 * @param config
 * @returns {{}}
 */
function doTransformsOnNode (node, transforms, file, config) {
    var clean = removeRootAttrs(node, file, config);
    var out   = {};
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
function buildOne (obj) {
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
function removeRootAttrs (node, file, config) {
    return Object.keys(node).reduce(function (all, item) {
        if (config.get("attrBlacklist").contains(item)) {
            return all;
        }
        all[item] = node[item];
        return all;
    }, {});
}

module.exports.doTransformsOnNode = doTransformsOnNode;
module.exports.buildOne           = buildOne;