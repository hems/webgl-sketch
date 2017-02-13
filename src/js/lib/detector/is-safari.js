var UA = require('./ua');
var IS_ANDROID_BROWSER = require('./is-android-browser');
var IS_CHROME = require('./is-chrome');

var IS_SAFARI = !IS_ANDROID_BROWSER && !IS_CHROME && /Safari/.test(UA);

module.exports = IS_SAFARI;
