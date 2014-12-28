var xml2js = require('xml2js');
var builder = require('./builder');

module.exports = function (string, file, config, cb) {
    return new xml2js.Parser().parseString(string, function (err, result) {
        cb(null, builder(result, file, config));
    });
};