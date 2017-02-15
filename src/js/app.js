import {
	GridHelper,
	AxisHelper,
	Vector3,
	MeshBasicMaterial,
	Mesh,
	MeshLambertMaterial,
} from 'three';
import {
	log,
	warn,
	info,
} from 'utils/console';
import OrbitControls from 'lib/three/examples/OrbitControls';
import AssetLoader from 'utils/asset-loader';
import RenderStats from 'lib/three/render-stats';
import stats from 'lib/stats';
import {
	parseGeometry,
} from 'lib/three/utils';
import WEBVR from 'lib/three/examples/WebVR';
import * as flags from './flags';
import {
	guiFlags,
} from './gui';
import lights from './lights';
import {
	cameraDev,
	cameraUser,
} from './cameras';
import renderer from './renderer';
import scene from './scene';
import {
	effect,
	controls,
	controller0,
	controller1,
} from './vive';
import {
	VIVE_AVAILABLE,
	SHOW_HELPERS,
	SHOW_STATS,
} from './constants';
import AssetManager from './asset-manager';
import ASSETS from './assets';

class App {

	constructor() {
		log('ixviii');

		// Renderer
		document.body.appendChild(renderer.domElement);

		// Lights
		Object.keys(lights).forEach((light) => {
			scene.add(lights[light]);
		});

		// Helpers
		if (SHOW_HELPERS) {
			scene.add(new GridHelper());
			scene.add(new AxisHelper());
		}

		// Stats
		if (SHOW_STATS) {
			this._renderStats = new RenderStats();
			this._renderStats.domElement.style.position = 'absolute';
			this._renderStats.domElement.style.left = '0px';
			this._renderStats.domElement.style.top = '48px';
			document.body.appendChild(this._renderStats.domElement);
			document.body.appendChild(stats.domElement);
		}

		// Controls
		this.controls = new OrbitControls(cameraDev, renderer.domElement);

		// Camera position
		this.zoom(cameraDev, 6);
		this.zoom(cameraUser, 6);

		// Gui
		guiFlags.add(flags, 'cameraDev');


		this._loadAssets()
			.then(this._onAssetsLoaded)
			.catch((error) => {
				warn('error creating scene', error);
			});
	}

	_loadAssets() {
		info('load assets');
		return new Promise((resolve, reject) => {
			AssetLoader('default', ASSETS).then((response) => {
				AssetManager.set(response);
				resolve();
			}).catch((error) => {
				reject(error);
			});
		});
	}

	_onAssetsLoaded = () => {
		this._setupScene()
			.then(this._onSceneReady)
			.catch((error) => {
				warn('error creating scene', error);
			});
	}

	_setupScene() {
		return new Promise((resolve, reject) => {
			try {
				if (VIVE_AVAILABLE) {
					// Add vive detection
					const model = AssetManager.getManifestAsset('vive', 'vr_controller_vive_1_5');
					const geometry = parseGeometry(model);
					const material = new MeshBasicMaterial();
					const mesh = new Mesh(geometry, material);
					mesh.material.map = AssetManager.getManifestAsset('vive', 'onepointfive_texture');
					mesh.material.specularMap = AssetManager.getManifestAsset('vive', 'onepointfive_spec');
					controller0.add(mesh.clone());
					controller1.add(mesh.clone());

					scene.add(controller0);
					scene.add(controller1);

					document.body.appendChild(WEBVR.getButton(effect));
				}

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
		effect.requestAnimationFrame(this._updateFunction);

		if (SHOW_STATS) {
			stats.begin();
		}

		controls.update();
		controller0.update();
		controller1.update();

		if (flags.cameraDev && !effect.isPresenting) {
			this._renderDev(cameraDev, 0, 0, 1, 1);
			this._renderDev(cameraUser, 0, 0, 0.25, 0.25);
		} else {
			this._renderMain(cameraUser, 0, 0, 1, 1);
		}

		if (SHOW_STATS) {
			this._renderStats.update(renderer);
			stats.end();
		}
	}

	_renderDev(camera, left, bottom, width, height) {
		left *= window.innerWidth;
		bottom *= window.innerHeight;
		width *= window.innerWidth;
		height *= window.innerHeight;

		renderer.setViewport(left, bottom, width, height);
		renderer.setScissor(left, bottom, width, height);
		renderer.setScissorTest(true);
		renderer.setClearColor(0x121212);

		renderer.render(scene, camera);
	}

	_renderMain(camera, left, bottom, width, height) {
		left *= window.innerWidth;
		bottom *= window.innerHeight;
		width *= window.innerWidth;
		height *= window.innerHeight;

		renderer.setViewport(left, bottom, width, height);
		renderer.setScissor(left, bottom, width, height);
		renderer.setScissorTest(true);
		renderer.setClearColor(0x121212);
		effect.render(scene, camera);
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
