/* eslint-disable */
require('shelljs/global');
const sharp = require('sharp');
const utils = {};

utils.objToJson = function(file, output) {
	return new Promise((resolve, reject) => {
		exec(`python ${__dirname}/convert_obj_three.py -i ${file} -o ${output}`, (code, stdout, stderr) => {
			if (code !== 0) {
				reject(code);
			}
			resolve(output);
		});
	});
}

function resizeTexture(size, file, outFile) {
	// console.log('size', size);
	// console.log('file', file);
	// console.log('outFile', outFile);
	return new Promise((resolve, reject) => {
		sharp(file)
			.resize(size, size)
			.toFile(outFile, (err, info) => {
				resolve(outFile);
			});
	});
};

utils.generateTextureSizes = function(texture, directory) {
	return new Promise((resolve, reject) => {
		const queue = [];
		const sizes = [256, 512, 1024, 2048];

		sizes.forEach(size => {
			const outFile = `${directory}/${texture.filename}-${size}.${texture.ext}`;
			queue.push(resizeTexture(size, texture.fullPath, outFile))
		});

		Promise.all(queue).then(resolve).catch(reject);
	});
};

utils.createManifest = function(files, directory) {
	const manifest = {
		geometries: [],
		textures: [],
	};

	function filter(file) {
		const _file = file.replace(`${directory}/`, '');
		if ((/\.(json)$/i).test(_file)) {
			manifest.geometries.push(_file);
		} else if ((/\.(jpg|png)$/i).test(_file)) {
			manifest.textures.push(_file);
		}
	}

	files.forEach(file => {
		if (file instanceof Array) {
			file.forEach(_file => {
				filter(_file);
			});
		} else {
			filter(file);
		}
	});
	return manifest;
}

module.exports = utils;
/* eslint-enable */
