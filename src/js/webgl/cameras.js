import THREE from 'three'

const fov = 65
const ratio = window.innerWidth / window.innerHeight
const near = 0.1
const far = 100000

export const cameraDev = new THREE.PerspectiveCamera(fov, ratio, near, far)
export const cameraUser = new THREE.PerspectiveCamera(fov, ratio, near, far)
