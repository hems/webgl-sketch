var UA = require('./ua');

var IS_WINDOWS_PHONE = /Windows Phone/i.test(UA);

module.exports = IS_WINDOWS_PHONE;
