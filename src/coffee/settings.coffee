md = new MobileDetect(window.navigator.userAgent)

module.exports =

	live: off
	debug: on
	base_path: ''
	retina: (window.devicePixelRatio is 2)
	fog: off

###
Controls
###

gui = require 'controllers/gui'

folder = gui.addFolder 'app'
# do folder.open

folder.add module.exports, 'debug'