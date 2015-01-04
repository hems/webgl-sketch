gulp   = require 'gulp'
concat = require 'gulp-concat'

production = process.env.NODE_ENV is 'production'

exports.paths =
	source: [
		'./src/vendor/jquery-2.1.1.min.js'
		'./src/vendor/EasePack.min.js'
		'./src/vendor/CSSPlugin.min.js'
		'./src/vendor/TweenLite.min.js'
		'./src/vendor/three.min.js'
		'./src/vendor/TrackballControls.js'
		'./src/vendor/SubdivisionModifier.js'
		'./src/vendor/mobile-detect.js'
	]
	destination: './public/js/'
	filename: 'vendor.js'

gulp.task 'vendor', ->

	gulp
		.src exports.paths.source
		.pipe concat exports.paths.filename
		.pipe gulp.dest exports.paths.destination