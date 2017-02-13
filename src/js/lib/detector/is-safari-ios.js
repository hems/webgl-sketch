var UA = require('./ua');
var IS_IOS = require('./is-ios');

var IS_SAFARI_IOS = IS_IOS && /AppleWebKit/.test(UA);

module.exports = IS_SAFARI_IOS;
