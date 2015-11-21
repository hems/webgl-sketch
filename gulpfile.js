var gulp 	    = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var source 	    = require('vinyl-source-stream');
var buffer 	    = require('vinyl-buffer');
var browserify  = require('browserify');
var babel 		= require('babelify');
var connect     = require('gulp-connect');
var jade 	    = require('gulp-jade');
var stylus 	    = require('gulp-stylus');
var gulpif 	    = require('gulp-if');
var nib 	    = require('nib');
var gutil 	    = require('gulp-util');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var CSSmin      = require('gulp-minify-css');
var browserSync = require('browser-sync');

var development = process.env.NODE_ENV == 'development';
var production  = process.env.NODE_ENV == 'production';

function handleError( error ){
	gutil.log( error );
	gutil.beep();
	this.emit('end');
};

function styles(){
	return  gulp.src('./src/stylus/app.styl')
		.pipe(stylus({
			use: nib(),
			linenos: development
		}))
		.on('error', handleError)
		.pipe(prefix('last 2 versions'))
		.pipe(gulpif(production, CSSmin()))
		.pipe(gulpif(production, rename('app.min.css')))
		.pipe(gulp.dest('./public/css'))
		.pipe(gulpif(development, browserSync.stream()));
};

function scripts(){

	var bundler = browserify({
		entries: ['./src/js/app.js'],
		debug: development
	}).transform(['babelify']);

	function rebundle(){

		bundler.bundle()
			.on('error', handleError)
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: development }))
			.pipe(gulpif(development, sourcemaps.write('./')))
			.pipe(gulpif(production, uglify()))
			.pipe(gulpif(production, rename('bundle.min.js')))
			.pipe(gulp.dest('./public/js'))
			.pipe(gulpif(development, browserSync.stream()));
	}

	rebundle();
};

function templates(){
	return  gulp.src('./src/jade/*.jade')
		.pipe(jade({
			pretty: development,
			locals: {
				production: production
			}
		}))
		.on('error', handleError)
		.pipe(gulp.dest('./public'))
		.pipe(gulpif(development, browserSync.stream()));
};

function server(){
	connect.server({
		port: 3000,
		root: './public'
	});
}

function watch(){
	gulp.watch( './src/jade/**/*.jade', [ 'templates' ] );
	gulp.watch( './src/stylus/**/*.styl', [ 'styles' ] );
	gulp.watch( './src/js/**/*.js', [ 'scripts' ] );
};

function sync(){
	browserSync({
		proxy: 'localhost:3000',
		notify: false,
		reloadDelay: 100,
		logLevel: "info",
	})
};

gulp.task('styles', function(){ return styles(); });
gulp.task('scripts', function(){ return scripts(); });
gulp.task('templates', function(){ return templates(); });
gulp.task('browser-sync', function(){ return sync(); });
gulp.task('watch', function(){ return watch(); });
gulp.task('server', function() { return server(); });

gulp.task('default', [ 'watch', 'server', 'browser-sync', 'styles', 'scripts', 'templates' ]);