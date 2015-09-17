log 	 = require 'utils/log'
settings = require 'app/settings'

class App

	constructor: ->

		window.c = log
		c.enable = !settings.live
		
		require 'webgl/main'

module.exports = $ -> new App