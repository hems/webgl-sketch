dat  	 = require 'dat-gui'
settings = require 'app/settings'

if not settings.live

	module.exports = new dat.GUI

else

	class Folder
		add:      -> return @
		listen:   -> return @
		name:     -> return @
		open:     -> return @
		onChange: -> return @

	class GUIWrapper

		add:       -> return @
		addFolder: -> new Folder
		addColor: -> return @
		listen: -> return @
		name:      -> return @
		close:     -> return @
		step: -> return @
		onChange: -> return @
		setValue: -> return @

	module.exports = new GUIWrapper