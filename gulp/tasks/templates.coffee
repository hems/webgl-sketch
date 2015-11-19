path 		= require 'path'
gulp 		= require 'gulp'
jade        = require 'gulp-jade'
gulpif      = require 'gulp-if'
browserSync = require 'browser-sync'
handleError = require '../util/handle_error'

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/jade/*.jade'
	watch: './src/jade/**/*.jade'
	destination: './public/'

gulp.task 'templates', ->

	gulp.src exports.paths.source
		
		.pipe(jade(
			pretty: true
		))
		.pipe gulp.dest exports.paths.destination
		.on 'error', handleError
		.pipe gulpif development, browserSync.stream()