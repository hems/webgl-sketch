var UA = require('./ua');

var IS_IPAD = !!UA.match(/iPad/i);

module.exports = IS_IPAD;
