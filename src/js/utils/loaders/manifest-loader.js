import EventDispatcher from 'happens';
import JsonLoader from './json-loader';
import TextureLoader from './texture-loader';
import { TEXTURE_SIZE } from 'constants';

export default class ManifestLoader {
	constructor(asset) {
		EventDispatcher(this);
		this.asset = asset;
		this.data = {};
	}

	_loadGeometry(asset) {
		const jsonLoader = new JsonLoader(asset);
		jsonLoader.once('loaded', this._assetLoaded);
		jsonLoader.once('error', this._assetError);
		return jsonLoader;
	}

	_loadTexture(asset) {
		const textureLoader = new TextureLoader(asset);
		textureLoader.once('loaded', this._assetLoaded);
		textureLoader.once('error', this._assetError);

		return textureLoader;
	}

	_assetLoaded = (asset) => {
		this.data[asset.args.fileName] = asset.data;

		this._loaded += 1;

		if (this._loaded === this._total) {
			this.asset.data = this.data;
			this.emit('loaded', this.asset);
		}
	}

	_assetError = (error) => {
		this.emit('error', error);
	}

	load() {
		const jsonLoader = new JsonLoader(this.asset);
		let filePath = this.asset.src.split('/');
		filePath.pop();
		filePath = filePath.join('/');

		jsonLoader.once('loaded', responce => {
			const loaders = [];

			// Load geometries
			responce.data.geometries.forEach(geometry => {
				const fileName = geometry.split('.')[0];
				loaders.push(this._loadGeometry({
					src: `${filePath}/${geometry}`,
					args: {
						fileName,
					}
				}));
			});

			// Load textures
			// Textures contains all sizes from 256 -> 2048
			// Only load the texture size defined in constants

			const filteredTextures = [];

			// Texture size can be overriden from asset arguments
			const textureSize = (this.asset.args.textureSize !== undefined) ?
				this.asset.args.textureSize : TEXTURE_SIZE;

			responce.data.textures.forEach(texture => {
				const fileName = texture.split('-')[0];

				// Get the pow size from the filename
				const size = parseInt(texture.split('-')[1].split('.')[0]);

				if (size === textureSize && filteredTextures.indexOf(fileName) === -1) {
					filteredTextures.push(texture);
				}
			});

			filteredTextures.forEach(texture => {
				const fileName = texture.split('-')[0];
				loaders.push(this._loadTexture({
					src: `${filePath}/${texture}`,
					args: {
						fileName,
					}
				}));
			});

			this._loaded = 0;
			this._total = loaders.length;

			loaders.forEach(loader => {
				loader.load();
			});
		});

		jsonLoader.load();
	}
}
