var xml2js = require('xml2js');
var attrTransforms = require("./attrTransforms");

module.exports = function (obj, file, config) {
    obj.svg.$ = doTransformsOnNode(obj.svg.$, attrTransforms, file, config);
    return {
        string: buildOne(obj),
        data: obj
    };
};

function doTransformsOnNode (node, transforms, file, config) {
    var out = {};
    Object.keys(node).forEach(function (key) {
        var fn = transforms[key];
        if (fn) {
            out[key] = fn(node[key], file, config);
        } else {
            out[key] = node[key];
        }
    });
    return out;
}

function buildOne (obj) {
    return new xml2js.Builder({
        headless: true
    }).buildObject(obj);
}

module.exports.doTransformsOnNode = doTransformsOnNode;
module.exports.buildOne           = buildOne;