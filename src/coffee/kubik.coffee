module.exports = class Kubik

  cubes: null

  constructor: (@rx = 0, @ry = 0, @rz = 0) ->

    texture = THREE.ImageUtils.loadTexture 'images/kubik_texture.jpg'
    # texture.anisotropy = world.renderer.getMaxAnisotropy();

    material = new THREE.MeshLambertMaterial( map: texture )
    # material = new THREE.MeshLambertMaterial( )
    geometry = new THREE.BoxGeometry( 1, 3, 1 )

    material.side = THREE.DoubleSide
    material.blending = 2
    material.transparent = true
    material.opacity = 0.1
    material.wireframe = true
    material.wireframeLinewidth = 2
    material.depthTest = false

    i      = 0
    ratio  = 0
    @cubes = []

    num_cubes = 180 * 3 * 5
    # num_cubes = 180 * 3
    # num_cubes = 180

    parent = new THREE.Object3D();

    parent.rotation.set Math.PI, @ry, @rz

    while i < num_cubes

      ratio = i / num_cubes

      cube = new THREE.Mesh geometry, material
      cube.position.z = 1

      group = new THREE.Object3D()
      group.add cube

      group.rotation.y = ( ratio * 360 ) * ( Math.PI / 180 )

      parent.add group

      @cubes.push cube

      i++

    do @spread_cubes

    world.add parent

    world.on "frame", @on_frame

  spread_cubes: ->

    ratio = 0

    for index, cube of @cubes

      ratio = index / @cubes.length

      cube.rotation.y = ratio * Math.PI * 3
      #cube.rotation.y = ratio * Math.PI * 20
      # cube.rotation.y = ratio * Math.PI * 81

  on_frame: =>
    for index, cube of @cubes

      ratio = index / @cubes.length

      cube.rotation.x += 0.1 * Math.PI / 180
