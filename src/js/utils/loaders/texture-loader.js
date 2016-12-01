import {
	TextureLoader,
} from 'three';
import EventDispatcher from 'happens';

export default class Loader {
	constructor(asset) {
		EventDispatcher(this);
		this.asset = asset;
	}

	load() {
		const loader = new TextureLoader();

		const onLoaded = (texture) => {
			this.asset.data = texture;
			this.emit('loaded', this.asset);
		};

		function onProgress() {}

		const onError = () => {
			this.emit('error', `Failed to load ${this.asset.src}`);
		};

		loader.load(this.asset.src, onLoaded, onProgress, onError);
	}
}
