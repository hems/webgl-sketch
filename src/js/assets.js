import {
	AUDIO_DIR,
	WEBGL_DIR,
} from './constants';

const ASSETS = [{
	id: 'track',
	type: 'audio',
	src: `${AUDIO_DIR}test/test`,
}, {
	id: 'vive',
	type: 'manifest',
	src: `${WEBGL_DIR}vive/manifest.json`,
	args: {
		textureSize: 512,
	}
}];
export default ASSETS;
