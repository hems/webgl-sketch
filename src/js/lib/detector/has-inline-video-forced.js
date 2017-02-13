var HAS_INLINE_VIDEO = require('./has-inline-video');
var HAS_WEBGL = require('./has-webgl');
var IOS_VERSION = require('./ios-version');

var HAS_INLINE_VIDEO_FORCED = (!HAS_INLINE_VIDEO && HAS_WEBGL && IOS_VERSION >= 8);

module.exports = HAS_INLINE_VIDEO_FORCED;
