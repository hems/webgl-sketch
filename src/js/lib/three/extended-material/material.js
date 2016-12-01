import {
	ShaderLib,
	ShaderMaterial,
} from 'three';
import basic from './basic.glsl';
import lambert from './lambert.glsl';
import phong from './phong.glsl';
import standard from './standard.glsl';

/**
 * @author DPR / http://ivxvixviii.io
 * Extend a threejs material
 */

export default function ExtendedMaterial(options) {
	const defaultUniforms = ShaderLib[options.type].uniforms;

	if (options.uniforms === undefined) {
		options.uniforms = {};
	}

	const uniforms = Object.assign({}, defaultUniforms, options.uniforms);

	let vertexShader = '';
	let fragmentShader = '';
	const vertexPrehooks = options.vertexPrehooks || '';
	const vertexMainhooks = options.vertexMainhooks || '';
	const vertexEndhooks = options.vertexEndhooks || '';
	const fragmentPrehooks = options.fragmentPrehooks || '';
	const fragmentMainhooks = options.fragmentMainhooks || '';
	const fragmentEndhooks = options.fragmentEndhooks || '';

	switch (options.type) {

		case 'basic': {
			vertexShader = basic.vertex(vertexPrehooks, vertexMainhooks, vertexEndhooks);
			fragmentShader = basic.fragment(fragmentPrehooks, fragmentMainhooks, fragmentEndhooks);
			break;
		}
		case 'lambert': {
			vertexShader = lambert.vertex(vertexPrehooks, vertexMainhooks, vertexEndhooks);
			fragmentShader = lambert.fragment(fragmentPrehooks, fragmentMainhooks, fragmentEndhooks);
			break;
		}
		case 'phong': {
			vertexShader = phong.vertex(vertexPrehooks, vertexMainhooks, vertexEndhooks);
			fragmentShader = phong.fragment(fragmentPrehooks, fragmentMainhooks, fragmentEndhooks);
			break;
		}
		case 'standard': {
			vertexShader = standard.vertex(vertexPrehooks, vertexMainhooks, vertexEndhooks);
			fragmentShader = standard.fragment(fragmentPrehooks, fragmentMainhooks, fragmentEndhooks);
			break;
		}
		default: {
			vertexShader = basic.vertex(vertexPrehooks, vertexMainhooks, vertexEndhooks);
			fragmentShader = basic.fragment(fragmentPrehooks, fragmentMainhooks, fragmentEndhooks);
		}
	}

	const args = Object.assign({}, options.args || {});

	args.uniforms = uniforms;
	args.vertexShader = vertexShader;
	args.fragmentShader = fragmentShader;
	args.lights = /lambert|phong|standard/.test(options.type);

	return new ShaderMaterial(args);
}
