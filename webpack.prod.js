const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common')
// const path = require('path')

module.exports = merge(common, {
	devtool: 'source-map',
	output: {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'main',
			filename: 'main-[hash].min.js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor-[hash].min.js'
		})
	]
})
