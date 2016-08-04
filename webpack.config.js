var path = require('path')
var webpack = require('webpack')
var minimize = process.argv.indexOf('-p') !== -1

module.exports = exports = {
  entry: './index.js',
  output: {
    path: './dist',
    libraryTarget: minimize ? 'umd' : 'commonjs',
    filename: 'reactive-elements.' + (minimize ? 'min.' : '') + 'js'
  },
  externals: {
  	react: true,
  	'react-dom': true
  },
  module: {
  },
  devtool: '#inline-source-map'
}
