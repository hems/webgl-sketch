var UA = require('./ua');
var IS_WINDOWS_PHONE = require('./is-windows-phone');

var IS_WINDOWS = !IS_WINDOWS_PHONE && /Windows/.test(UA);

module.exports = IS_WINDOWS;
