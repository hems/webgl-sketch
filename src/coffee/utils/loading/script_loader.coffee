happens	= require 'happens'

module.exports = class ImageLoader

	constructor: -> happens @

	load: ( asset ) ->

		script = document.createElement('script')
		script.setAttribute("type","text/javascript")
		script.setAttribute("src", asset.src)
		script.setAttribute("id", asset.id)

		document.getElementsByTagName("head")[0].appendChild(script)

		@emit 'loaded', asset