
module.exports =

	live: off
	debug: on
	base_path: ''
	retina: (window.devicePixelRatio is 2)
	fog: on

###
Controls
###

gui = require 'controllers/gui'

folder = gui.addFolder 'settings'
# do folder.open

folder.add module.exports, 'debug'