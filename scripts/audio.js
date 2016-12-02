'use-strict'
require('shelljs/global')

function convert(cmd, output, assetsPathDest) {
	mkdir('-p', assetsPathDest);
	return new Promise((resolve, reject) => {
		exec(cmd, (code, stdout, stderr) => {
			if (code !== 0) {
				reject(stderr);
			} else {
				resolve(output);
			}
		});
	});
}

function generate(id) {
	return new Promise((resolve, reject) => {
		var converts = [];

		const filesMp3 = `${__dirname}/../src/assets/audio/${id}/*.mp3`
		const filesWav = `${__dirname}/../src/assets/audio/${id}/*.wav`
		const assetsPathDest = `${__dirname}/../assets/audio/${id}`

		function convertFiles(files) {
			const tmp = [];
			ls(files).forEach(function(file) {
				var filename = file.split('/').pop()
				filename = filename.replace('.wav', '')
				filename = filename.replace('.mp3', '')
				const outFileMp3 = assetsPathDest + '/' + filename + '.mp3';
				const outFileOgg = assetsPathDest + '/' + filename + '.ogg';
				tmp.push(convert(`ffmpeg -loglevel panic -y -i '${file}' -write_xing 0 -f mp3 '${outFileMp3}'`, outFileMp3, assetsPathDest))
				tmp.push(convert(`ffmpeg -loglevel panic -y -i '${file}' -c:a libvorbis -q:a 4 '${outFileOgg}'`, outFileOgg, assetsPathDest))
			});
			return tmp;
		}

		converts.concat(convertFiles(filesMp3));
		converts.concat(convertFiles(filesWav));

		Promise.all(converts).then(resolve).catch(reject);
	});
}

Promise.all([
	generate('webgl/default')
]).then(() => {
	console.log('Done');
}).catch(error => {
	console.log('Error', error);
})
