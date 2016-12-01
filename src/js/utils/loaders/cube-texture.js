import {
	CubeTextureLoader,
} from 'three';
import EventDispatcher from 'happens';

function getUrls(path, format) {
	const fileFormat = format === undefined ? 'png' : format;
	const sides = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];
	const images = [];
	for (let i = 0; i < sides.length; i++) {
		images.push(`${path}/${sides[i]}.${fileFormat}`);
	}
	return images;
}

export default class Loader {
	constructor(asset) {
		EventDispatcher(this);
		this.asset = asset;
	}

	load() {
		const loader = new CubeTextureLoader();
		const urls = getUrls(this.asset.src, this.asset.args.format);

		const onLoaded = (texture) => {
			this.asset.data = texture;
			this.emit('loaded', this.asset);
		};

		const onProgress = () => {};

		const onError = () => {
			this.emit('error', `Failed to load ${this.asset.src}`);
		};

		loader.load(urls, onLoaded, onProgress, onError);
	}
}
