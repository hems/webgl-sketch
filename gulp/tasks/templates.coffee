path 		= require 'path'
gulp 		= require 'gulp'
livereload  = require 'gulp-livereload'
jade        = require 'gulp-jade'
handleError = require '../util/handle_error'
gulpif      = require 'gulp-if'

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
		.pipe gulpif development, livereload()
		.on 'error', handleError