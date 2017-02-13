var UA = require('./ua');
var IS_ANDROID = require('./is-android');

var ANDROID_VERSION = !IS_ANDROID ? -1 : parseFloat(UA.slice(UA.indexOf('Android') + 8));

module.exports = ANDROID_VERSION;
