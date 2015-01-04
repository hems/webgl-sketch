gulp 	    = require 'gulp'
livereload  = require 'gulp-livereload'
stylus      = require 'gulp-stylus'
nib 	    = require 'nib'
CSSmin      = require 'gulp-minify-css'
source      = require 'vinyl-source-stream'
prefix      = require 'gulp-autoprefixer'
handleError = require '../util/handle_error'

production = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/stylus/app.styl'
	watch: './src/**/*.styl'
	destination: './public/css/'

gulp.task 'styles', ->
	styles = gulp
		.src exports.paths.source
		.pipe(stylus({set: ['include css'], use: nib()}))
		.on 'error', handleError
		.pipe prefix 'last 2 versions', 'Chrome 34', 'Firefox 28', 'iOS 7'

	styles = styles.pipe(CSSmin()) if production
	styles = styles.pipe gulp.dest exports.paths.destination
	styles = styles.pipe livereload() unless production
	styles