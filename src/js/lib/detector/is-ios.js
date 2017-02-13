var UA = require('./ua');
var IS_WINDOWS_PHONE = require('./is-windows-phone');

var IS_IOS = (!!UA.match(/iP[ao]d|iPhone/i) && !IS_WINDOWS_PHONE);

module.exports = IS_IOS;
