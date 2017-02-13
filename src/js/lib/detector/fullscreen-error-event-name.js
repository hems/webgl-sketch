var FULLSCREEN_ERROR_EVENT_NAME = (function () {
	var fullscreenerrors = {
		fullscreenerror: 'fullscreenerror',
		MozFullscreenerror: 'mozfullscreenerror',
		WebkitFullscreenerror: 'webkitfullscreenerror',
	};
	var fullscreenerror;
	for (var t in fullscreenerrors) {
		var name = fullscreenerrors[t];
		var eventName = 'on' + name;
		if (eventName in document) {
			fullscreenerror = name;
			break;
		}
	}
	return fullscreenerror;
})();

module.exports = FULLSCREEN_ERROR_EVENT_NAME;
