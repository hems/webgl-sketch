import THREE from 'three.js';
import * as flags from './flags';
import gui from './gui';
import Screen from './screen';
import * as c from './log';
const OrbitControls = require('three-orbit-controls')(THREE);

class App{
	
	constructor(){

		c.enable = true;

		c.log('IVXVIXVIII');

		// Renderer
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( Screen.width, Screen.height );

		document.body.appendChild( this.renderer.domElement );

		// Scene
		this.scene = new THREE.Scene();

		// Cameras
		this.cameras = {
			user: new THREE.PerspectiveCamera( 65, Screen.width / Screen.height, 0.1, 100000 ),
			dev: new THREE.PerspectiveCamera( 65, Screen.width / Screen.height, 0.1, 100000 )
		};	

		this.zoom( this.cameras.dev, 100 );

		// Helpers
		if( flags.showHelpers ){
			this.scene.add( new THREE.GridHelper( 50, 10 ) );
			this.scene.add( new THREE.AxisHelper( 10 ) );
		}

		// Lights
		const lights = new Map();
		
		lights.set('ambient', new THREE.AmbientLight( 0x444444 ));
		lights.set('directional', new THREE.DirectionalLight( 0x444444 ));

		lights.get('directional').position.set( 0, 1, 0 );
		lights.get('directional').castShadow = true;

		for( let [key, light] of lights ){
			this.scene.add(light);
		};

		// Controls
		this.controls = new OrbitControls( this.cameras.dev, this.renderer.domElement );

		// Bind
		Screen.on('resize', this.resize.bind(this));
		
		this.update();
	}

	zoom( camera, zoom ){
		camera.position.set( 1 * zoom, 0.75 * zoom, 1 * zoom );
		camera.lookAt( new THREE.Vector3() );
	}

	update(){

		requestAnimationFrame( this.update.bind(this) );

		if( flags.debug ){
			this.render( this.cameras.dev,  0, 0, 1, 1 );
			this.render( this.cameras.user,  0, 0, 0.25, 0.25 );
		} else {
			this.render( this.cameras.dev,  0, 0, 0.25, 0.25 );
			this.render( this.cameras.user,  0, 0, 1, 1 );
		}
	}

	render( camera, left, bottom, width, height ){

		left   *= Screen.width;
		bottom *= Screen.height;
		width  *= Screen.width;
		height *= Screen.height;

		this.cameras.dev.updateProjectionMatrix();
		this.cameras.user.updateProjectionMatrix();

		this.renderer.setViewport( left, bottom, width, height );
		this.renderer.setScissor( left, bottom, width, height );
		this.renderer.enableScissorTest( true );
		this.renderer.setClearColor( 0x121212 );

		this.renderer.render( this.scene, camera );
	}

	resize( ){

		this.cameras.dev.aspect  = Screen.width / Screen.height;
		this.cameras.user.aspect = Screen.width / Screen.height;
		
		this.cameras.dev.updateProjectionMatrix()
		this.cameras.user.updateProjectionMatrix()

		this.renderer.setSize( Screen.width, Screen.height );
	}
}

export default new App();