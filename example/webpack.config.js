const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'example.js'),
  context: __dirname,
  devServer: {
    contentBase: __dirname,
    port: 9000,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: __dirname,
    filename: 'example-bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html'),
    }),
  ],
};
