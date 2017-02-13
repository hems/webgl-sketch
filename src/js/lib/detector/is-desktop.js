var IS_PHONE = require('./is-phone');
var IS_TABLET = require('./is-tablet');

var IS_DESKTOP = (!IS_PHONE && !IS_TABLET);

module.exports = IS_DESKTOP;
