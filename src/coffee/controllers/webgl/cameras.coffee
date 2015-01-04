win = require 'utils/window'
gui = require 'controllers/gui'

exports.user = new THREE.PerspectiveCamera( 65, win.width / win.height, 0.1, 100000 )
exports.dev  = new THREE.PerspectiveCamera( 65, win.width / win.height, 0.1, 100000 )

gui = gui.addFolder 'cameras'
# do gui.open

exports.user.name = 'user'
exports.dev.name  = 'dev'

gui.add exports.user, 'name'		
gui.add(exports.user, 'fov', 10, 200).listen()

gui.add exports.dev, 'name'		
gui.add(exports.dev, 'fov', 10, 200).listen()