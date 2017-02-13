var HAS_TOUCH = !!(
	'ontouchstart' in window ||
	'onmsgesturechange' in window ||
	(window.DocumentTouch && document instanceof window.DocumentTouch)
);

module.exports = HAS_TOUCH;
