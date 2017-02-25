const debug = process.env.NODE_ENV === 'prod';
const webpack = require('webpack');

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
    ],
  },
  output: {
    filename: './public/bundle.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin({mangle: true, sourcemap: true}),
  ],
  devServer: {
    contentBase: "./public",
    hot: true
  },
}