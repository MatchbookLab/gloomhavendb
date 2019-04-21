// this is the SERVER's webpack config

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?174', './src/server/main.ts'],
  watch: !process.env.NO_WATCH,
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?174'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /e2e/,
          /client/,
        ],
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, '/src/server/tsconfig.server.json'),
      }),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/, /\.spec\.ts/, /\/e2e\//, /\/client\//]),
  ],
  output: {
    path: path.join(__dirname, 'dist/server-hot'),
    filename: 'server.js',
  },
};

setTimeout(() => {
  console.log('Please wait while webpack builds for the first time…');
});
