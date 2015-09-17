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
			controllers : __dirname + '/src/coffee/controllers'
			utils       : __dirname + '/src/coffee/utils'
			views       : __dirname + '/src/coffee/views'
			webgl       : __dirname + '/src/coffee/webgl'
			templates   : __dirname + '/src/jade'

	node:
		fs: "empty"