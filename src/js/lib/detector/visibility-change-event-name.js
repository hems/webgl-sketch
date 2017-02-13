var VISIBILITY_CHANGE_EVENT_NAME = (function () {
	var value = undefined;
	var props = {
		hidden: 'visibilitychange',
		mozHidden: 'mozvisibilitychange',
		msHidden: 'msvisibilitychange',
		webkitHidden: 'webkitvisibilitychange',
	};
	for (var p in props) {
		if (typeof document[p] !== 'undefined') {
			value = props[p];
			break;
		}
	}
	return value;
})();

module.exports = VISIBILITY_CHANGE_EVENT_NAME;
