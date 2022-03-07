const path = require('path')

const config = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: `scripts/[name].js`,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devServer: {
    host: 'localhost',
    hot: true,
    inline: true,
    compress: true,
    port: 3000,
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true,
  },
}

module.exports = config
