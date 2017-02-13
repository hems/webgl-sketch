var TRANSITION_END_EVENT_NAME = (function () {
	var el = document.createElement('fakeelement');
	var transitions = {
		transition: 'transitionend',
		OTransition: 'oTransitionEnd',
		MozTransition: 'transitionend',
		WebkitTransition: 'webkitTransitionEnd',
	};
	var transitionend;
	for (var t in transitions) {
		if (el.style[t] !== undefined) {
			transitionend = transitions[t];
			break;
		}
	}
	return transitionend;
})();

module.exports = TRANSITION_END_EVENT_NAME;
