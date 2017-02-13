var UA = require('./ua');
var IS_ANDROID = require('./is-android');
var IS_IOS = require('./is-ios');
var IS_WINDOWS_PHONE = require('./is-windows-phone');

var IS_TABLET = (IS_ANDROID || IS_IOS || IS_WINDOWS_PHONE) && (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(UA.toLowerCase())); // eslint-disable-line

module.exports = IS_TABLET;
