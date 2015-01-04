module.exports = new class

	constructor: ->

		@detect    = new MobileDetect(window.navigator.userAgent)
		@tests 	   = {}
		@messages  =
			'WebGL'  : 'WebGL'
			'desktop': 'Desktop Browser'
			'tablet' : 'Tablet Browser'
			'mobile' : 'Mobile Browser'

	###
	Specify the tests for this experiment
	@param tests [Array]
	###
	set_tests: (tests) ->

		for test in tests
			switch test
				when 'desktop'
					if not @detect.tablet() or not @detect.mobile()
						@tests['desktop'] = on
					else
						@tests['desktop'] = off
				when 'tablet'
					@tests['tablet'] = @detect.tablet()
				when 'mobile'
					@tests['mobile'] = @detect.mobile()
				when 'AudioContext'
					@tests['AudioContext'] = (window.AudioContext or window.webkitAudioContext)
				when 'WebGL'
					supportsWebGL = (->
					  try
					    return !!window.WebGLRenderingContext and !!document.createElement("canvas").getContext("experimental-webgl")
					  catch e
					    return false
					)
					@tests['WebGL'] = supportsWebGL()
				when 'mp3'
					@tests['mp3'] = Modernizr.audio.mp3
				when 'ogg'
					@tests['ogg'] = Modernizr.audio.ogg

	###
	Test the browser against the tests 
	###
	supported: ->

		result = false

		@fails = []

		for test, supported of @tests
			unless supported
				@fails.push @messages[test]

		if @fails.length < 1
			result = on

		for test, supported of @tests

			if supported is off
				result = off
				break

			if test in ['desktop', 'tablet', 'mobile'] and supported
				result = on

		return result

	###
	Display a message to the user about the test results
	###
	unsupported: ->

		template = require 'templates/views/unsupported.jade'

		locals =
			fails: @fails

		$('body').css
			'background-image' : 'url("screenshot.jpg")'

		$('body').append template locals
