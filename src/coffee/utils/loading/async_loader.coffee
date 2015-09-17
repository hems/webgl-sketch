happens	 	   = require 'happens'
DataLoader     = require './data_loader'
BinaryLoader   = require './binary_loader'
ImageLoader    = require './image_loader'
ScriptLoader   = require './script_loader'
GeometryLoader = require './geometry_loader'
SoundLoader    = require './sound_loader'

Element::remove = ->
	@parentElement.removeChild this
	return

NodeList::remove = HTMLCollection::remove = ->
	i = 0
	len = @length

	while i < len
		this[i].parentElement.removeChild this[i]	if this[i] and this[i].parentElement
		i++
	return

###
Load files asynchronously
###
module.exports = class AsyncLoader

	constructor: ->

		happens @

		@manifest = []

	add: (id, file, type, data) ->

		# c.log id, file, type

		obj =
			id   : id
			src  : file
			type : type
			data : data

		@manifest.push obj

	load: ->

		@count = 0
		@total = @manifest.length

		@date = new Date()

		for asset in @manifest

			switch asset.type

				when 'json', 'xml'
					l = new DataLoader
					l.once 'loaded', @success
					l.load asset

				when 'image'
					l = new ImageLoader
					l.once 'loaded', @success
					l.load asset

				when 'binary'
					l = new BinaryLoader
					l.once 'loaded', @success
					l.load asset

				when 'js'
					l = new ScriptLoader
					l.once 'loaded', @success
					l.load asset

				when 'geometry'
					l = new GeometryLoader
					l.once 'loaded', @success
					l.load asset

				when 'sound'
					l = new SoundLoader
					l.once 'loaded', @success
					l.load asset

	dispose: ->

		for asset in @manifest

			switch asset.type

				when 'js'
					document.getElementById(asset.id).remove()


	success: ( asset ) =>

		@count++

		if @count >= @total

			# c.debug 'Loaded in', (new Date() - @date) / 1000

			@emit 'loaded', @manifest

	error: ( error ) =>

		c.log 'error', error


	get_asset: ( id ) ->
		result = false
		for asset in @manifest
			if asset.id is id
				result = asset

		return result
