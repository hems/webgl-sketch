import GroupLoader from './loaders/group-loader';
import CubeTextureLoader from './loaders/cube-texture';
import TextureLoader from './loaders/texture-loader';
import AudioLoader from './loaders/audio-loader';

/**
 * Loads all assets for a webgl scene
 */
export default function load(id, assets) {
	return new Promise((resolve, reject) => {
		const loader = new GroupLoader(id);
		const manifest = [];
		assets.forEach((asset) => {
			if (asset.args === undefined) {
				asset.args = {};
			}
			manifest.push({
				id: asset.id,
				src: asset.src,
				type: asset.type,
				args: asset.args,
			});
		});

		const additionalLoaders = {
			cubeTexture: CubeTextureLoader,
			texture: TextureLoader,
			audio: AudioLoader,
		};

		loader.once('loaded', (response) => {
			resolve(response);
		});

		loader.once('error', (error) => {
			reject(error);
		});

		loader.load(manifest, additionalLoaders);
	});
}
