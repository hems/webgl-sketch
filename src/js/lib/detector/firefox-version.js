var UA = require('./ua');
var IS_FIREFOX = require('./is-firefox');

var FIREFOX_VERSION = (function () {
	if (!IS_FIREFOX) return -1;
	return parseFloat(UA.slice(UA.indexOf('Firefox') + 8));
})();

module.exports = FIREFOX_VERSION;
