settings = require 'app/settings'
gui 	 = require 'controllers/gui'

folder = gui.addFolder('fog')

module.exports = new THREE.Scene

# start = 0.00022
start = 0.00400

if settings.fog
	module.exports.fog = new THREE.FogExp2 0x121212, start

	folder.add(module.exports.fog, 'density', 0, 0.01)