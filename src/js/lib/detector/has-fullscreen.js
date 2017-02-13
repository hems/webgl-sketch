var HAS_FULLSCREEN = (function () {
	var element = document.body;
	return !!(
		element.requestFullScreen ||
		element.webkitRequestFullScreen ||
		element.mozRequestFullScreen ||
		element.msRequestFullscreen
	);
})();

module.exports = HAS_FULLSCREEN;
