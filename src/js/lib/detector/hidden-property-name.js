var HIDDEN_PROPERTY_NAME = (function () {
	var value = undefined;
	var props = {
		hidden: 'hidden',
		mozHidden: 'mozHidden',
		msHidden: 'msHidden',
		webkitHidden: 'webkitHidden',
	};
	for (var p in props) {
		if (typeof document[p] !== 'undefined') {
			value = props[p];
			break;
		}
	}
	return value;
})();

module.exports = HIDDEN_PROPERTY_NAME;
