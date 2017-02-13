var UA = require('./ua');

var IS_LINUX = /Linux/.test(UA);

module.exports = IS_LINUX;
