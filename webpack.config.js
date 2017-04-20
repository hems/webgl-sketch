const path = require( 'path' )

module.exports = {
	entry: {
    app: './src/coffee/app.coffee',
	},
	output: {
		path: path.resolve( __dirname, './build/assets/js' ),
		filename: 'bundle.js',
  },
  module: {
    // TODO: update config to only use "rules"
    // instead of loaders?
    //rules: [ {
      //test: /\.coffee$/,
      //use: [ {
        //loader: 'coffee-loader',
        //options: { sourceMap: true }
      //}]
    //}],

		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'stage-0'],
			},
    },{
			test: /\.coffee$/,
			exclude: /node_modules/,
			loader: 'coffee-loader',
    }],
	},
	devtool: 'source-map',
	stats: 'minimal',
};
