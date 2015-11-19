config 	 	= require '../../package'
gulp 		= require 'gulp'
coffeeify   = require 'gulp-coffeeify'
uglify      = require 'gulp-uglify'
gulpif      = require 'gulp-if'
rename      = require 'gulp-rename'
handleError = require '../util/handle_error'
browserSync = require 'browser-sync'

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'
base_path   = process.env.PWD

exports.paths =
	source: './src/coffee/app.coffee'
	watch: './src/coffee/**/*.coffee'
	destination: './public/js/'
	filename: 'app.js'
	release: "app.min.#{config.version}.js"

gulp.task 'scripts', ->

	if production
		filename = exports.paths.release
	else
		filename = exports.paths.filename

	gulp.src exports.paths.source
		.pipe coffeeify({
			debug: development
			transform: ['aliasify']
		})
		.pipe gulpif production, uglify()
		.pipe rename filename
		.on 'error', handleError
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, browserSync.stream()