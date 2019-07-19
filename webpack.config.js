const path = require('path')
const nodeExternals = require('webpack-node-externals')

const {
  NODE_ENV = process.env.NODE_ENV
} = process.env
module.exports = {
  entry: './src/server.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  externals: [ nodeExternals() ]
}