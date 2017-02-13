var UA = require('./ua');

var IS_IPHONE = !!UA.match(/iPhone/i);

module.exports = IS_IPHONE;
