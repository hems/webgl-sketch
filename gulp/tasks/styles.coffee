config 	 	= require '../../package'
gulp 	    = require 'gulp'
livereload  = require 'gulp-livereload'
stylus      = require 'gulp-stylus'
nib 	    = require 'nib'
CSSmin      = require 'gulp-minify-css'
prefix      = require 'gulp-autoprefixer'
rename      = require 'gulp-rename'
handleError = require '../util/handle_error'

production = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/stylus/app.styl'
	watch: './src/**/*.styl'
	destination: './public/css/'
	release: "app.min.#{config.version}.css"

gulp.task 'styles', ->
	gulp
		.src exports.paths.source
		.pipe(stylus({set: ['include css'], use: nib()}))
		.on 'error', handleError
		.pipe prefix 'last 2 versions', 'Chrome 34', 'Firefox 28', 'iOS 7'

	if production
		gulp.src(exports.paths.destination + 'app.css')
			.pipe CSSmin()
			.pipe(rename(exports.paths.release))
			.pipe(gulp.dest(exports.paths.destination))