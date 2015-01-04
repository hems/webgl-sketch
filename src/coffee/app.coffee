log 	 	  = require 'utils/log'
settings      = require 'app/settings'
black 		  = require 'controllers/black'

class App

	constructor: ->

		window.c = log
		c.enable = !settings.live

		do @setup

	setup: ->

		black.set_tests ['desktop', 'WebGL']

		if not black.supported()
			do black.unsupported
			return
		
		require 'controllers/index'

module.exports = $ -> new App