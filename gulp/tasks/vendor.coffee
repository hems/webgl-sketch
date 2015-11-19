config         = require '../../package.json'
gulp   		   = require 'gulp'
gulpif         = require 'gulp-if'
concat 		   = require 'gulp-concat'
uglify         = require 'gulp-uglify'
mainBowerFiles = require 'main-bower-files'
handleError    = require '../util/handle_error'
rename         = require 'gulp-rename'

production = process.env.NODE_ENV is 'production'

exports.paths =
	source: mainBowerFiles({
		"overrides": {
			"dat-gui": {
				"main": "build/dat.gui.js"
			}
		}
	})
	destination: './public/js/'
	filename: 'vendor.js'
	release: "vendor.min.#{config.version}.js"

# Additional files
exports.paths.source = exports.paths.source.concat [
	__dirname + '/../../bower_components/three.js/examples/js/controls/OrbitControls.js'
	__dirname + '/../../src/vendor/*.js'
]

gulp.task 'vendor', ->

	filename = if production then exports.paths.release else exports.paths.filename

	gulp
		.src exports.paths.source
		.pipe concat exports.paths.filename
		.pipe gulpif production, uglify()
		.pipe rename filename
		.pipe gulp.dest exports.paths.destination
		.on 'error', handleError