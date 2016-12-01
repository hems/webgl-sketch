'use-strict'
require('shelljs/global');
const imagemin = require('./imagemin-fork');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpg = require('imagemin-mozjpeg');
const sizeOf = require('image-size');
const sharp = require('sharp');

// Don't compress these dirs
const ignoredDirs = [
];

function resize() {
	console.log('Textures resizing for device');

	// Copy across ignored files
	ignoredDirs.forEach(dir => {
		cp('-R', `${__dirname}/../frontend/assets/image/webgl/desktop/${dir}`, `${__dirname}/../assets/image/webgl/desktop/`);
	});

	function convert(input, output, width, height, isNormalMap, assetsPathDest) {
		mkdir('-p', assetsPathDest);

		if (isNormalMap) {
			cp(input, output);
			return;
		}

		return new Promise((resolve, reject) => {
			sharp(input)
				.resize(width, height)
				.toFile(output, (err, info) => {});
		});
	}

	function generate(id) {
		return new Promise((resolve, reject) => {
			var converts = [];

			const filesJpg = `${__dirname}/../dist/image/webgl/desktop/${id}/*.jpg`;
			const filesPng = `${__dirname}/../dist/image/webgl/desktop/${id}/*.png`;
			const assetsPathDest = `${__dirname}/../dist/assets/image/webgl/device/${id}`;

			function convertFiles(files) {
				const tmp = [];
				ls(files).forEach(function(file) {

					var filename = file.split('/').pop()
					const ext = filename.split('.')[1];
					filename = filename.replace('.jpg', '')
					filename = filename.replace('.png', '')
					const isNormalMap = filename.indexOf('-normal') !== -1;

					const outFile = assetsPathDest + '/' + filename + '.' + ext;
					const dimensions = sizeOf(file);

					const newWidth = Math.round(dimensions.width / 2);
					const newHeight = Math.round(dimensions.height / 2);

					tmp.push(convert(file, outFile, newWidth, newHeight, isNormalMap, assetsPathDest))
				});
				return tmp;
			}

			converts.concat(convertFiles(filesJpg));
			converts.concat(convertFiles(filesPng));

			Promise.all(converts).then(resolve).catch(reject);
		});
	}

	Promise.all([
		generate('default'),
	]).then(() => {
		console.log('Textures resized');
	})
}

console.log('Textures compressing');

const path = `${__dirname}/../src/assets/image/webgl/**/*.{png,jpg}`;
const dest = `${__dirname}/../dist/image/`;

const ignoredPaths = [];
ignoredDirs.forEach(dir => {
	ignoredPaths.push(`!${__dirname}/../src/assets/image/webgl/desktop/${dir}/**`);
});

const paths = [path].concat(ignoredPaths);

imagemin(paths, dest, {
	plugins: [
		imageminPngquant({
			quality: '65-80'
		}),
		imageminJpg(),
	],
}).then(() => {
	console.log('Textures compressed');
	resize();
}).catch(error => {
	console.error(error);
})
