var UA = require('./ua');

var IS_ANDROID_BROWSER = (function () {
	var matches = UA.match(/Android.*AppleWebKit\/([\d.]+)/);
	return !!matches && matches[1] < 537;
})();

module.exports = IS_ANDROID_BROWSER;
