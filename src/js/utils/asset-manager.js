import { log, warn } from './console';
const find = require('lodash/find');

export default class AssetManager {
	constructor(id) {
		this.id = id;
		this.assets = {};
	}

	set(assets) {
		this.assets = assets;
		log(`AssetManager::set ${this.id}`, this.assets);
	}

	/**
	 * Get an asset by id
	 * @param  {String} id
	 * @return {Mixed}
	 */
	get(id, all = false) {
		const asset = find(this.assets, { id });
		if (asset) {
			return all ? asset : asset.data;
		}
		warn(`AssetManager::get no assets found for ${id} in scene ${this.id} `);
		return false;
	}

	/**
	 * Get a model from geometry.json
	 * @param  {String} id
	 * @return {Mixed}
	 */
	getManifestAsset(id, assetId) {
		const manifest = find(this.assets, { id: id });
		if (manifest) {
			if (manifest.data[assetId] !== undefined) {
				return manifest.data[assetId];
			}
			warn(`AssetManager::get no assets found for ${id} in scene ${this.id} `);
		}
		return false;
	}

	dispose() {
		/* eslint-disable */
		for (let id in this.assets) {
			if ({}.hasOwnProperty.call(this.assets, id)) {
				switch (this.assets[id].type) {
					case 'texture':
					case 'cubeTexture':
						// console.log('dispose texture', this.assets[id].data);
						this.assets[id].data.dispose();
						break;
					default:
				}
				delete this.assets[id];
			}
		}
		/* eslint-enable */
		this.assets = {};
	}
}
