/* eslint-disable */
'use-strict';
require('shelljs/global');
const AssetUtils = require('./assets-utils');
const fs = require('fs');

/**
 * Export and optimise assets
 */

const ASSETS_SRC_DIR = './src/assets/webgl';
const ASSETS_DIR = './assets/webgl';

ls('-d', `${ASSETS_SRC_DIR}/*`).forEach(directory => {
	// console.log('\n');
	const directoryName = directory.split('/').pop();
	console.log('Packing assets for directory >', directoryName);

	// Create tmp output directory
	const tmpDirectory = `${directory}/tmp`;
	mkdir('-p', tmpDirectory);

	// Get geometries
	const geometries = [];
	ls('-A', `${directory}`).forEach(file => {
		if ((/\.(obj)$/i).test(file)) {
			geometries.push({
				file,
				filename: file.split('.')[0],
				ext: file.split('.')[1],
				fullPath: `${directory}/${file}`,
			});
		}
	});

	// Get textures
	const textures = [];
	ls('-A', `${directory}`).forEach(file => {
		if ((/\.(jpg|png)$/i).test(file)) {
			textures.push({
				file,
				filename: file.split('.')[0],
				ext: file.split('.')[1],
				fullPath: `${directory}/${file}`,
			});
		}
	});

	// console.log('Found geometries >', geometries);
	// console.log('Found textures >', textures);

	// Convert geomeries
	const queueGeometries = [];
	geometries.forEach(geometry => {
		const filename = `${tmpDirectory}/${geometry.filename}.json`;
		queueGeometries.push(AssetUtils.objToJson(geometry.fullPath, filename));
	});

	// Compress textures
	const queueTextures = [];
	textures.forEach(texture => {
		queueTextures.push(AssetUtils.generateTextureSizes(texture, tmpDirectory));
	});

	// Combined queue
	const queue = queueGeometries.concat(queueTextures);

	// After all assets are processed
	Promise.all(queue).then(response => {
		// console.log(response);

		const manifest = JSON.stringify(AssetUtils.createManifest(response, tmpDirectory), null, 2);
		const manifestFile = `${tmpDirectory}/manifest.json`;

		fs.writeFile(manifestFile, manifest, function(error) {
			if(error) {
				return console.log(error);
			}
			console.log(`Wrote > ${manifestFile}`);

			// Create out directory
			const destDirectory = `${ASSETS_DIR}/${directoryName}`;
			mkdir('-p', destDirectory);

			// Now copy files to assets directory
			cp(`${tmpDirectory}/*`, destDirectory);

			// Cleanup tmp directory
			rm('-rf', tmpDirectory);
		});
	});
});
/* eslint-enable */
