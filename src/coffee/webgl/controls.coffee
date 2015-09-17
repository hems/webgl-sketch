settings = require 'app/settings'
cameras  = require 'webgl/cameras'
renderer = require 'webgl/renderer'

camera = cameras.dev

if !settings.live
	controls = new THREE.OrbitControls camera, $('canvas')[0]

module.exports = controls 