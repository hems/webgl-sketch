happens	= require 'happens'

module.exports = class SoundLoader

	constructor: -> happens @

	load: ( asset ) ->

		console.log asset.src

		sound = new p5.SoundFile(asset.src, =>

			asset.data = sound

			@emit 'loaded', asset
		)