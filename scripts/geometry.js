'use-strict';
require('shelljs/global');
const fs = require('fs');
const assetsSourceDir = `${__dirname}/../src/assets/obj`;
const assets = [];

// Default
assets.push({
	filename: 'triangle',
	scene: 'default',
	dir: `${assetsSourceDir}/default/triangle/desktop`,
	platform: 'desktop',
});
assets.push({
	filename: 'triangle',
	scene: 'default',
	dir: `${assetsSourceDir}/default/triangle/device`,
	platform: 'device',
});
assets.push({
	filename: 'cube',
	scene: 'default',
	dir: `${assetsSourceDir}/default/cube`,
	platform: 'all',
});

function objToJson(file, output) {
	return new Promise((resolve, reject) => {
		exec(`python ${__dirname}/convert_obj_three.py -i ${file} -o ${output}`, (code, stdout, stderr) => {
			if (code !== 0) {
				reject(error);
			}
			resolve(output);
		});
	});
}

function loadJson(src) {
	const filename = src.split('/').pop().split('.').shift();
	return new Promise((resolve, reject) => {
		var data = require(src);
		resolve({
			id: filename,
			data: data,
		});
	});
}

function outputCombined(combinedFile, json) {
	return new Promise((resolve, reject) => {
		fs.writeFile(combinedFile, JSON.stringify(json), (err) => {
			if (err) {
				console.log('error', err);
				reject(error);
			} else {
				console.log("JSON saved to:", combinedFile);
				resolve(json);
			}
		});
	});
}

function convert(asset) {
	return new Promise((resolve, reject) => {

		// Get all files inside directory

		const convertToJson = [];
		const combine = [];

		// Convert all objs in the directory to json
		ls(`${asset.dir}/*.obj`).forEach(function(file) {
			const filename = file.split('/').pop().split('.').shift();
			const jsFile = `${asset.dir}/${filename}.json`;
			convertToJson.push(objToJson(file, jsFile));
		});

		Promise.all(convertToJson).then(() => {
			ls(`${asset.dir}/*.json`).forEach(function(file) {
				if (file.indexOf('geometry.json') === -1) {
					combine.push(loadJson(file));
				}
			});

			Promise.all(combine).then((response) => {

				const json = {
					models: response
				};

				const filename = 'geometry.json';
				const outfile = `${asset.dir}/${filename}`;

				const final = [];
				const assetsDesktop = `${__dirname}/../dist/assets/json/webgl/desktop/${asset.scene}/${asset.filename}`;
				const assetsDevice = `${__dirname}/../dist/assets/json/webgl/device/${asset.scene}/${asset.filename}`;

				switch (asset.platform) {
					case 'desktop':
						final.push(assetsDesktop);
						break;
					case 'device':
						final.push(assetsDevice);
						break;
					default:
						final.push(assetsDesktop);
						final.push(assetsDevice);
				}

				const copyTos = [
					outputCombined(outfile, json),
				];

				final.forEach(f => {
					mkdir('-p', f);
					outputCombined(`${f}/${filename}`, json);
				});

				Promise.all(copyTos).then(resolve);
			});
		});
	});
}

const promises = [];
assets.forEach(asset => {
	promises.push(convert(asset));
});

Promise.all(promises).then(() => {
	console.log('Done');
}).catch(error => {
	console.log('Error', error);
})
