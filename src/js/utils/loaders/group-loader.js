import ImageLoader from './image-loader';
import JsonLoader from './json-loader';
import objectAssign from 'object-assign';
import EventDispatcher from 'happens';
import { log } from '../../console';
import Detector from '@stinkdigital/detector';

const loaderDebug = false;

const div = document.createElement('div');
document.body.appendChild(div);
div.style.position = 'absolute';
div.style.left = '0';
div.style.top = '0';
div.style.zIndex = '1000000000';
div.style.color = 'black';
div.style.width = '320px';
div.style.height = '200px';
div.style.display = 'none';

export default class GroupLoader {

	constructor(id) {
		EventDispatcher(this);
		this.id = id;
		this.defaultLoaders = {
			image: ImageLoader,
			json: JsonLoader,
		};
	}

	_load() {
		if (this._queue < this._total) {
			if (this._currentParallel < this._parallelLoads) {
				const loader = this._loaders[this._queue];
				this._queue++;
				this._currentParallel++;
				this._currentLoader++;
				loader.once('loaded', this._onLoaded.bind(this));
				loader.once('error', this._onError.bind(this));
				loader.load();
				this._load();
			}
		}
	}

	_onLoaded() {
		this._loaded++;
		log(`${this.id} loaded`, this._loaded, '/', this._total);

		if (loaderDebug) {
			div.innerHTML = `${this._loaded} ${this._total}`;
		}
		if (this._loaded === this._total) {
			const assets = [];
			this._loaders.forEach(loader => {
				assets.push(loader.asset);
			});
			this.emit('loaded', assets);
		} else {
			this._currentParallel--;
			this._load();
		}
	}

	_onError(error) {
		this.emit('error', error);
	}

	load(manifest, customLoaders = {}) {
		if (loaderDebug) {
			div.style.display = 'block';
		}

		this._loaders = [];
		const FileLoaders = objectAssign({}, this.defaultLoaders, customLoaders);

		manifest.forEach(asset => {
			if (FileLoaders[asset.type] !== undefined) {
				this._loaders.push(new FileLoaders[asset.type](asset));
			}
		});

		this._loaded = 0;
		this._queue = 0;
		this._currentLoader = 0;
		this._currentParallel = 0;
		this._parallelLoads = Detector.IS_DESKTOP ? 10 : 5;
		this._total = this._loaders.length;

		this._load();
	}
}
