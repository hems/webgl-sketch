var IS_PHONE = require('./is-phone');
var IS_TABLET = require('./is-tablet');

var DEVICE_TYPE = (function () {
	if (IS_PHONE) return 'phone';
	if (IS_TABLET) return 'tablet';
	return 'desktop';
})();

module.exports = DEVICE_TYPE;
