import THREE from 'three'
import * as flags from './flags'
import {
	gui
} from './controllers/gui'
import * as c from './log'
import lights from './webgl/lights'
import {
	cameraDev,
	cameraUser
} from './webgl/cameras'

const renderer = require('./webgl/renderer')
const scene = require('./webgl/scene')
const OrbitControls = require('three-orbit-controls')(THREE)

class App {

	constructor() {

		c.enable = true

		c.log('IVXVIXVIII')

		this.zoom(cameraDev, 100)

		// Renderer
		document.body.appendChild(renderer.domElement)

		// Lights
		for (let id in lights) {
			scene.add(lights[id])
		}

		// Helpers
		if (flags.showHelpers) {
			scene.add(new THREE.GridHelper(50, 10))
			scene.add(new THREE.AxisHelper(10))
		}

		// Controls
		this.controls = new OrbitControls(cameraDev, renderer.domElement)

		// Bind
		this.bind()
		this.update()
	}

	bind() {
		window.addEventListener('resize', this.resize.bind(this), false)
	}

	zoom(camera, zoom) {
		camera.position.set(1 * zoom, 0.75 * zoom, 1 * zoom)
		camera.lookAt(new THREE.Vector3())
	}

	update() {

		requestAnimationFrame(this.update.bind(this))

		if (flags.debug) {
			this.render(cameraDev, 0, 0, 1, 1)
			this.render(cameraUser, 0, 0, 0.25, 0.25)
		} else {
			this.render(cameraDev, 0, 0, 0.25, 0.25)
			this.render(cameraUser, 0, 0, 1, 1)
		}
	}

	render(camera, left, bottom, width, height) {

		left *= window.innerWidth
		bottom *= window.innerHeight
		width *= window.innerWidth
		height *= window.innerHeight

		cameraDev.updateProjectionMatrix()
		cameraUser.updateProjectionMatrix()

		renderer.setViewport(left, bottom, width, height)
		renderer.setScissor(left, bottom, width, height)
		renderer.setScissorTest(true)
		renderer.setClearColor(0x121212)

		renderer.render(scene, camera)
	}

	resize() {

		cameraDev.aspect = window.innerWidth / window.innerHeight
		cameraUser.aspect = window.innerWidth / window.innerHeight

		cameraDev.updateProjectionMatrix()
		cameraUser.updateProjectionMatrix()

		renderer.setSize(window.innerWidth, window.innerHeight)
	}
}

export default new App()
