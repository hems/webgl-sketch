var IS_MOBILE = require('./is-mobile');
var HAS_DEVICE_ORIENTATION_EVENT = require('./has-device-orientation-event');

var HAS_GYRO = IS_MOBILE && HAS_DEVICE_ORIENTATION_EVENT;

module.exports = HAS_GYRO;
