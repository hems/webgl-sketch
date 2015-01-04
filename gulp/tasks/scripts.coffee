path 		= require 'path'
gulp 		= require 'gulp'
webpack     = require 'gulp-webpack'
uglify      = require 'gulp-uglify'
gulpif      = require 'gulp-if'
livereload  = require 'gulp-livereload'
handleError = require '../util/handle_error'

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'
base_path   = process.env.PWD

exports.paths =
	source: './src/coffee/app.coffee'
	watch: './src/coffee/**/*.coffee'
	destination: './public/js/'
	filename: 'app.js'

gulp.task 'scripts', ->

	gulp.src exports.paths.source

		.pipe webpack require( base_path + '/webpack.config' )
		.pipe gulpif production, uglify()
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, livereload()

		.on 'error', handleError