var UA = require('./ua');
var IS_IOS = require('./is-ios');

var IS_OSX = !IS_IOS && /Mac OS/.test(UA);

module.exports = IS_OSX;
