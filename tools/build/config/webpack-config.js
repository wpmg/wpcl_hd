const PATH = require('path');

const webpack = require('webpack');

const ROOT = '../../../';

const FRONTEND_FOLDER = PATH.resolve(__dirname, ROOT, 'frontend/');

const PUBLIC_ENTRY_FILE = PATH.resolve(__dirname, ROOT, FRONTEND_FOLDER, 'client-public.js');
const DASHBOARD_ENTRY_FILE = PATH.resolve(__dirname, ROOT, FRONTEND_FOLDER, 'client-dashboard.js');


const BUILD_FILE = '[name].js';

const BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'public/js/');
const PUBLIC_PATH = '/js/';

const webpackConfig = {
  entry: {
    app_public: PUBLIC_ENTRY_FILE,
    app_dashboard: DASHBOARD_ENTRY_FILE,
  },
  output: {
    path: BUILD_FOLDER,
    publicPath: PUBLIC_PATH,
    filename: BUILD_FILE,
  },
  devtool: 'inline-source-map',
  bail: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          FRONTEND_FOLDER,
        ],
        loader: 'babel-loader',
        query: {
          compact: false,
          cacheDirectory: true,
          presets: ['react'],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],
};

module.exports = webpackConfig;
