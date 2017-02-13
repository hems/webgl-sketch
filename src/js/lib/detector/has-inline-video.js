var IS_IPOD = require('./is-ipod');
var IS_IPHONE = require('./is-iphone');
var IS_IPAD = require('./is-ipad');
var IOS_VERSION = require('./ios-version.js');

var HAS_INLINE_VIDEO = (function () {
	var videoEl = document.createElement('video');
	var hasVideo = !!videoEl.canPlayType;
  var ipad_no_inline = IS_IPAD && IOS_VERSION < 9;
	return hasVideo && !(IS_IPOD || IS_IPHONE || ipad_no_inline);
})();

module.exports = HAS_INLINE_VIDEO;
