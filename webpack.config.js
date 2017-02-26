const debug = process.env.NODE_ENV === 'prod';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./app/components/Main.js'],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: './public/app.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: true}),
    new ExtractTextPlugin({ filename: './public/Main.css', disable: false, allChunks: true }),
  ],
  devServer: {
    contentBase: "./public",
    hot: true
  },
}