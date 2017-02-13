import {
	IMAGE_DIR_SCENE_DEFAULT,
	JSON_DIR_SCENE_DEFAULT,
	AUDIO_DIR_SCENE_DEFAULT,
} from './constants';

const ASSETS = [{
	id: 'black',
	type: 'texture',
	src: `${IMAGE_DIR_SCENE_DEFAULT}/black.jpg`,
}, {
	id: 'white',
	type: 'texture',
	src: `${IMAGE_DIR_SCENE_DEFAULT}/white.png`,
},
// {
// 	id: 'track',
// 	type: 'audio',
// 	src: `${AUDIO_DIR_SCENE_DEFAULT}/test`,
// },
{
	id: 'cube',
	type: 'json',
	src: `${JSON_DIR_SCENE_DEFAULT}/cube/geometry.json`,
}, {
	id: 'triangle',
	type: 'json',
	src: `${JSON_DIR_SCENE_DEFAULT}/triangle/geometry.json`,
}, {
	id: 'vive-controller',
	type: 'json',
	src: `${JSON_DIR_SCENE_DEFAULT}/vive/geometry.json`,
}, {
	id: 'vive-spec',
	type: 'texture',
	src: `${IMAGE_DIR_SCENE_DEFAULT}/onepointfive_spec.png`,
}, {
	id: 'vive-texture',
	type: 'texture',
	src: `${IMAGE_DIR_SCENE_DEFAULT}/onepointfive_texture.png`,
}];
export default ASSETS;
