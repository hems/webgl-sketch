import sono from 'sono';
import EventDispatcher from 'happens';

export default class Loader {
	constructor(asset) {
		EventDispatcher(this);
		this.asset = asset;
	}

	load() {
		const sound = sono.createSound({
			id: this.asset.id,
			src: [`${this.asset.src}.ogg`, `${this.asset.src}.mp3`],
			volume: this.asset.args && this.asset.args.volume ? this.asset.args.volume : 1,
			onComplete: () => {
				this.asset.data = sound;
				this.asset.defaultVolume = this.asset.args && this.asset.args.volume ?
					this.asset.args.volume : 1;
				this.emit('loaded', this.asset);
			},
		});
	}
}
