var HAS_WEBGL = require('./has-webgl');

var MAX_CUBE_MAP_TEXTURE_SIZE = (function () {
	if (!HAS_WEBGL) {
		return undefined;
	}

	try {
		var canvas = document.createElement('canvas');
		var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		return gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
	} catch (e) {
		return undefined;
	}
})();

module.exports = MAX_CUBE_MAP_TEXTURE_SIZE;
