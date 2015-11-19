gulp = require 'gulp'

paths =
	templates: require('./templates').paths
	styles: require('./styles').paths
	scripts: require('./scripts').paths

gulp.task "watch", ->

	gulp.watch paths.templates.watch, ['templates']
	gulp.watch paths.styles.watch, ['styles']
	gulp.watch paths.scripts.watch, ['scripts']