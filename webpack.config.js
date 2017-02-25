{
  context: config.root,
  entry: ['client/index.jsx'],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: config.buildLocation,
    filename: 'bundle.js',
    publicPath: '/bundle/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEV,
            localIdentName: DEV ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            modules: true,
            minimize: !DEV,
          })}`,
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEV,
            localIdentName: DEV ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            minimize: !DEV,
          })}`,
          'sass-loader',
        ],
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=10000&mimetype=image/gif',
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg',
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader: 'url-loader?limit=1&name=/[hash].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEV ? 'development' : 'production'),
    }),
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': `${config.appURL}:${config.port}`,
    },
    host: '127.0.0.1',
  },
  postcss() {
    return [
      // your post css plugins (if any)
    ];
  },
}