// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/audio.js
var HAS_OGG_VORBIS = (function () {
  var elem = document.createElement('audio');
  var bool = false;
  try {
    bool = !!elem.canPlayType;
    if (bool) {
      bool = new Boolean(bool);
      bool = elem.canPlayType('audio/ogg; codec="vorbis"').replace(/^no$/, '');
    }
  } catch (e) { }
  return bool;
})();

module.exports = HAS_OGG_VORBIS;


