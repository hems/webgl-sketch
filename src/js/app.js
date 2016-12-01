import {
	GridHelper,
	AxisHelper,
	Vector3,
} from 'three';
import * as flags from './flags';
import {
	guiFlags,
} from './gui';
import {
	log,
	warn,
	info,
} from './console';
import lights from './webgl/lights';
import {
	cameraDev,
	cameraUser,
} from './webgl/cameras';
import renderer from './webgl/renderer';
import scene from './webgl/scene';
import OrbitControls from './lib/three/orbit-controls';
import {
	SHOW_HELPERS,
} from './constants';
import AssetLoader from './utils/asset-loader';
import AssetManager from './asset-manager';
import ASSETS from './assets';

class App {

	constructor() {
		log('IVXVIXVIII');

		// Renderer
		document.body.appendChild(renderer.domElement);

		// Lights
		Object.keys(lights).forEach(light => {
			scene.add(lights[light]);
		});

		// Helpers
		if (SHOW_HELPERS) {
			scene.add(new GridHelper(50, 10));
			scene.add(new AxisHelper(10));
		}

		// Controls
		this.controls = new OrbitControls(cameraDev, renderer.domElement);

		// Camera position
		this.zoom(cameraDev, 100);

		// Gui
		guiFlags.add(flags, 'cameraDev');

		this._loadAssets()
			.then(this._onAssetsLoaded)
			.catch(error => {
				warn('error creating scene', error);
			});
	}

	_loadAssets() {
		info('load assets');
		return new Promise((resolve, reject) => {
			AssetLoader('default', ASSETS).then(response => {
				AssetManager.set(response);
				resolve();
			}).catch(error => {
				reject(error);
			});
		});
	}

	_onAssetsLoaded = () => {
		this._setupScene()
			.then(this._onSceneReady)
			.catch(error => {
				warn('error creating scene', error);
			});
	}

	_setupScene() {
		return new Promise((resolve, reject) => {
			try {
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	_onSceneReady = () => {
		info('scene ready');
		this._updateFunction = this._update.bind(this);
		this._bindListeners();
		this._update();
	}

	_bindListeners() {
		window.addEventListener('resize', this._onResize, false);
	}

	zoom(camera, zoom) {
		camera.position.set(1 * zoom, 0.75 * zoom, 1 * zoom);
		camera.lookAt(new Vector3());
	}

	_update() {
		requestAnimationFrame(this._updateFunction);

		if (flags.cameraDev) {
			this._render(cameraDev, 0, 0, 1, 1);
			this._render(cameraUser, 0, 0, 0.25, 0.25);
		} else {
			this._render(cameraDev, 0, 0, 0.25, 0.25);
			this._render(cameraUser, 0, 0, 1, 1);
		}
	}

	_render(camera, left, bottom, width, height) {
		left *= window.innerWidth;
		bottom *= window.innerHeight;
		width *= window.innerWidth;
		height *= window.innerHeight;

		cameraDev.updateProjectionMatrix();
		cameraUser.updateProjectionMatrix();

		renderer.setViewport(left, bottom, width, height);
		renderer.setScissor(left, bottom, width, height);
		renderer.setScissorTest(true);
		renderer.setClearColor(0x121212);

		renderer.render(scene, camera);
	}

	_onResize = () => {
		cameraDev.aspect = window.innerWidth / window.innerHeight;
		cameraUser.aspect = window.innerWidth / window.innerHeight;

		cameraDev.updateProjectionMatrix();
		cameraUser.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}
}

export default new App();
