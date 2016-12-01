import {
	FontLoader,
} from 'three';
import EventDispatcher from 'happens';

export default class Loader {
	constructor(asset) {
		EventDispatcher(this);
		this.asset = asset;
	}

	load() {
		const loader = new FontLoader();

		function onLoaded(font) {
			this.asset.data = font;
			this.emit('loaded', this.asset);
		}

		function onProgress() {}

		function onError() {
			this.emit('error', `Failed to load ${this.asset.src}`);
		}

		loader.load(this.asset.src, onLoaded, onProgress, onError);
	}
}
