var UA = require('./ua');

var IE_VERSION = (function () {
	var v = -1;
	if (/MSIE (\d+\.\d+);/.test(UA)) {
		v = parseInt(RegExp.$1, 10);
	} else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(UA)) {
		v = parseInt(RegExp.$3, 10);
	}
	return v;
})();

module.exports = IE_VERSION;
