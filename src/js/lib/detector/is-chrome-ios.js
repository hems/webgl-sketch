var UA = require('./ua');
var IS_IOS = require('./is-ios');

var IS_CHROME_IOS = IS_IOS && /CriOS/.test(UA);

module.exports = IS_CHROME_IOS;
