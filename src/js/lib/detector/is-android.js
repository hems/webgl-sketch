var UA = require('./ua');
var IS_WINDOWS_PHONE = require('./is-windows-phone');

var IS_ANDROID = (!!UA.match(/Android/i) && !IS_WINDOWS_PHONE);

module.exports = IS_ANDROID;
