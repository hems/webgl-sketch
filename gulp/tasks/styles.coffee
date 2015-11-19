config 	 	= require '../../package'
gulp 	    = require 'gulp'
stylus      = require 'gulp-stylus'
nib 	    = require 'nib'
CSSmin      = require 'gulp-minify-css'
prefix      = require 'gulp-autoprefixer'
rename      = require 'gulp-rename'
gulpif      = require 'gulp-if'
browserSync = require 'browser-sync'
handleError = require '../util/handle_error'

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/stylus/app.styl'
	watch: './src/**/*.styl'
	destination: './public/css/'
	filename: 'app.css'
	release: "app.min.#{config.version}.css"

gulp.task 'styles', ->

	filename = if production then exports.paths.release else exports.paths.filename

	gulp
		.src exports.paths.source
		.pipe(stylus({set: ['include css'], use: nib()}))
		.on 'error', handleError
		.pipe prefix 'last 2 versions'
		.pipe gulpif production, CSSmin()
		.pipe rename filename
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, browserSync.stream()