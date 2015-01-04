settings = require 'app/settings'
cameras  = require 'app/controllers/webgl/cameras'
renderer = require 'app/controllers/webgl/renderer'

camera = cameras.dev

controls = new THREE.TrackballControls camera, $('canvas')[0]
controls.rotateSpeed          = 1.0
controls.zoomSpeed            = 1.2
controls.panSpeed             = 0.8
controls.noZoom 	          = false
controls.noPan  	          = false
controls.staticMoving 		  = true
controls.dynamicDampingFactor = 0.5

module.exports = controls 