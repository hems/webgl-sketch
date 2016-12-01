import EventDispatcher from 'happens';

export default class ImageLoader {
	constructor(asset) {
		EventDispatcher(this);
		this.asset = asset;
	}

	load() {
		const image = new Image();

		image.onload = () => {
			this.asset.data = image;
			this.emit('loaded', this.asset);
		};

		image.onerror = () => {
			this.emit('error', `Failed to load ${this.asset.src}`);
		};

		image.src = this.asset.src;
	}
}
