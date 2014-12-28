var attrTransforms = require("../../lib/attrTransforms");
var builder        = require("../../lib/builder");
var config         = require("../../lib/config");

var assert         = require("chai").assert;
var path           = require("path");

describe("Transforming ID's on root node", function () {
    it("uses file name as ID", function () {
        var out = builder.doTransformsOnNode({id: "shane"}, attrTransforms, {path: "/Users/shane/file-1.svg"}, config());
        assert.deepEqual(out, {
            id: "file-1"
        });
    });
    it("uses file name as ID", function () {
        var out = builder.doTransformsOnNode({id: "shane"}, attrTransforms, {path: "/Users/shane/file-1.svg"}, config({svgId: "icon-%f"}));
        assert.deepEqual(out, {
            id: "icon-file-1"
        });
    });
});