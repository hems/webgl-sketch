import {
	AmbientLight,
	DirectionalLight,
} from 'three'
import {
	scene
} from './scene'
import {
	gui,
} from '../gui';

// Lights
let controller = {
	ambient: 0xd4d4d4,
	directional: 0xFFFFFF
}

let lights = {
	ambient: new AmbientLight(controller.ambient),
	directional: new DirectionalLight(controller.directional, 0.6)
}

lights.directional.position.set(1, 1, 1)

let lightFolder = gui.addFolder('lights')
lightFolder.open()

lightFolder.addColor(controller, 'ambient').onChange(updateLights.bind(this))
lightFolder.addColor(controller, 'directional').onChange(updateLights.bind(this))
lightFolder.add(lights.directional.position, 'x', -10, 10).name('dir light x')
lightFolder.add(lights.directional.position, 'y', -10, 10).name('dir light y')
lightFolder.add(lights.directional.position, 'z', -10, 10).name('dir light z')

function updateLights() {
	lights.ambient.color.setHex(String(controller.ambient).replace('#', '0x'))
	lights.directional.color.setHex(String(controller.directional).replace('#', '0x'))
}

export default lights
