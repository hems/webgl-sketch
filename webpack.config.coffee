require 'coffee-script'

module.exports =
	
	output:
		filename: 'app.js'
	
	module:
		loaders: [
			{ test: /\.jade$/, loader: "jade" }
			{ test: /\.coffee$/, loader: 'coffee-loader' }
		]
	
	resolve:
		extensions: [ '', '.js', '.coffee' ]
		alias:
			app 		: __dirname + '/src/coffee'
			models 		: __dirname + '/src/coffee/models'
			controllers : __dirname + '/src/coffee/controllers'
			utils       : __dirname + '/src/coffee/utils'
			views       : __dirname + '/src/coffee/views'
			data        : __dirname + '/src/coffee/data'
			templates   : __dirname + '/src/jade'

	node:
		fs: "empty"