qs = require 'qs'

parameters = qs.parse window.location.href.split("?")[1]

THREE    = require 'three'

app      = require "../js/app.js"
scene    = require "../js/scene"
renderer = require "../js/renderer"
vive     = require "../js/vive"

effect = vive.effect

loader   = new THREE.TextureLoader()
texture  = loader.load '/assets/images/kubik_texture.jpg'
#texture.anisotropy = renderer.getMaxAnisotropy();
geometry = new THREE.BoxGeometry( 1, 1, 1 )

material = new THREE.MeshLambertMaterial map: texture
material.side               = THREE.DoubleSide
material.blending           = 2
material.transparent        = true
material.opacity            = 0.1
material.wireframe          = true
material.wireframeLinewidth = 0
material.depthTest          = false


parent = new THREE.Object3D()
#parent.position.set null, 2, null
parent.rotation.set Math.PI / 2, 0, 0

spawn = ( num_cubes ) ->

  cubes = []

  for i in [0..num_cubes]

    ratio = i / num_cubes

    cube = new THREE.Mesh geometry, material

    group = new THREE.Object3D()
    group.add cube

    parent.add group

    cubes.push { cube, group }

    i++

  cubes

scene.add parent

distribute_cubes = ->

  ratio = 0

  for index, cube of cubes

    ratio = index / cubes.length

    cube.cube.position.z = 1

    #cube.group.rotation.x = ( ratio * 360 ) * ( Math.PI / 180 )
    #cube.group.rotation.z = ( ratio * 360 ) * ( Math.PI / 180 )
    cube.group.rotation.y = ( ratio * 360 ) * ( Math.PI / 180 )

spread_cubes = ( magic ) ->

  ratio = 0

  for index, cube of cubes

    cube  = cube.cube
    ratio = index / cubes.length

    cube.rotation.y = ratio * Math.PI * magic
    #cube.rotation.y = ratio * Math.PI * 20
    #cube.rotation.y = ratio * Math.PI * 81

on_frame = ->

  for index, cube of cubes

    ratio = index / cubes.length

    cube.cube.rotation.x += 0.1 * Math.PI / 180

  effect.requestAnimationFrame on_frame

cubes = spawn 180 * 6
#cubes = spawn 380

do distribute_cubes

spread_cubes( 20 )

setTimeout (-> on_frame() ), 200
