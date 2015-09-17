scene 	 = require 'webgl/scene'
gui 	 = require 'controllers/gui'
Loader   = require 'utils/loading/async_loader'
Mouse 	 = require 'utils/mouse' 
utils 	 = require 'utils/utils'
cameras  = require 'webgl/cameras'
settings = require 'app/settings'
win 	 = require 'utils/window'

module.exports = class Index

	constructor: ->