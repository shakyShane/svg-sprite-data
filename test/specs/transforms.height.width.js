var attrTransforms = require("../../lib/attrTransforms");
var builder        = require("../../lib/builder");
var config         = require("../../lib/config");
var json           = require("../fixtures/objects/arr-black.json");

var assert         = require("chai").assert;
var path           = require("path");

describe("Transforming height and width attributes", function () {
    it("strips px", function () {
        var out = builder.doTransformsOnNode(json.svg.$, attrTransforms, {path: "/Users/shane/file-1.svg"}, config({
            svgId: "shane-%f"
        }));
        assert.deepEqual(out.y, 0);
        assert.deepEqual(out.width,  8);
        assert.deepEqual(out.height, 12);
    });
    it("removes un-needed attrs", function () {
        var out = builder.doTransformsOnNode(json.svg.$, attrTransforms, {path: "/Users/shane/file-1.svg"}, config({
            svgId: "shane-%f"
        }));
        assert.isUndefined(out.xmlns);
        assert.isUndefined(out["xmlns:xlink"]);
    });
    it("strips IDs", function () {
        var out = builder(json, {path: "/Users/shane/file-1.svg"}, config({
            svgId: "shane-%f"
        }));
        assert.isUndefined(out.data.svg.g.id);
    });
    it("Add's x to root blacklist when layout is vertical", function () {
        var out = builder(json, {path: "/Users/shane/file-1.svg"}, config());
        assert.isUndefined(out.data.svg.g.x);
    });
});