gui = require 'controllers/gui'

folder = gui.addFolder 'lights'

colors = 
	ambient: '#444444'

ambient = new THREE.AmbientLight( 0x444444 )

directionalLight = new THREE.DirectionalLight( 0xffffff, 1 )
directionalLight.position.set( 0, 1, 0 )

directionalLight.castShadow = true

update = ->

	ambient.color.setHex colors.ambient.replace '#', '0x'

folder.addColor( colors, 'ambient' ).onChange update

exports.all = [
	ambient
	directionalLight
]