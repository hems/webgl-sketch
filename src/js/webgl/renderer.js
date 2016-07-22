import THREE from 'three'

const renderer = new THREE.WebGLRenderer({
	antialias: true
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

module.exports = renderer