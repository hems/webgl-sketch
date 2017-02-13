var UA = require('./ua');

var IS_IPOD = !!UA.match(/iPod/i);

module.exports = IS_IPOD;
