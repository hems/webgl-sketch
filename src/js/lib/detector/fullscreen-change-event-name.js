var FULLSCREEN_CHANGE_EVENT_NAME = (function () {
	var fullscreenchanges = {
		fullscreenchange: 'fullscreenchange',
		MozFullscreenchange: 'mozfullscreenchange',
		WebkitFullscreenchange: 'webkitfullscreenchange',
	};
	var fullscreenchange;
	for (var t in fullscreenchanges) {
		var name = fullscreenchanges[t];
		var eventName = 'on' + name;
		if (eventName in document) {
			fullscreenchange = name;
			break;
		}
	}
	return fullscreenchange;
})();

module.exports = FULLSCREEN_CHANGE_EVENT_NAME;
