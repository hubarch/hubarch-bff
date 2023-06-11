const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const env = process?.env.NODE_ENV ?? 'development';

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: false,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: {
    alias: {
      root: path.resolve(__dirname, 'src/'),
      configuration: path.resolve(__dirname, '/src/configuration'),
      router: path.resolve(__dirname, '/src/router'),
    },
    extensions: ['.ts', '.json'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.(ts|tsx)?$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|jpeg|woff|woff2|ttf)$/, type: 'asset/resource' },
      { test: /\.json$/, type: 'json' },
    ],
  },
  plugins: [
    new Dotenv({
      path: `./.env.${env}`,
    }),
    new NodemonPlugin(),
  ],
};
