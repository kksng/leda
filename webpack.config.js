const path = require('path');
const os = require('os');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: './demo/index.tsx',
  },
  output: {
    path: path.resolve('dist', 'demo'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve('node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    host: os.platform() === 'linux' ? '0.0.0.0' : 'localhost',
    port: process.env.PORT || 9000,
    contentBase: path.resolve('public'),
    overlay: true,
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: new RegExp('^' + path.resolve('node_modules')),
      // include specific files based on a RegExp
      include: new RegExp('^' + path.resolve('leda')),
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
  ],
};
