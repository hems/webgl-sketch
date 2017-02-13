var IS_IOS = require('./is-ios');
var IOS_VERSION = require('./ios-version');

var HAS_WEBGL = (function () {
	if (IS_IOS && IOS_VERSION < 8) {
		return false;
	}

	try {
		if (!window.WebGLRenderingContext) {
			return false;
		}
		var canvas = document.createElement('canvas');
		var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
	} catch (e) {
		return false;
	}

	return true;
})();

module.exports = HAS_WEBGL;
