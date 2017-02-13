var UA = require('./ua');

var IOS_VERSION = (function () {
	if (/iP[ao]d|iPhone/i.test(UA)) {
		var matches = UA.match(/OS (\d+)_(\d+)/i);
		if (matches && matches.length > 2) {
			return parseFloat(matches[1] + '.' + matches[2]);
		}
	}
	return -1;
})();


module.exports = IOS_VERSION;
