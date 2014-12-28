var xml2js = require('xml2js');

module.exports = function (obj, cb) {
    return parseOne(obj, cb);
};

function parseOne (string, cb) {
    return new xml2js.Parser().parseString(string, cb);
}