const PATH = require('path');

const webpack = require("webpack");

const ROOT = '../../../';

const APP_FOLDER = PATH.resolve(__dirname, ROOT, 'app/');

const PUBLIC_ENTRY_FILE = PATH.resolve(__dirname, ROOT, APP_FOLDER, 'client-public.js');
const DASHBOARD_ENTRY_FILE = PATH.resolve(__dirname, ROOT, APP_FOLDER, 'client-dashboard.js');


const BUILD_FILE = '[name].js';

const BUILD_FOLDER = PATH.resolve(__dirname, ROOT, 'app/public/js/');
const PUBLIC_PATH = '/js/';

const ESLINT_CONFIG_FILE = PATH.resolve(__dirname, ROOT, 'tools/build/config/eslint-config.json');

var webpackConfig = {
    entry: {
        'app_public': PUBLIC_ENTRY_FILE,
        'app_dashboard': DASHBOARD_ENTRY_FILE
    },
    output: {
        path: BUILD_FOLDER,
        publicPath: PUBLIC_PATH,
        filename: BUILD_FILE
    },
    devtool: 'inline-source-map',
    bail: true,
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                include: [
                    APP_FOLDER
                ],
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                include: [
                    APP_FOLDER
                ],
                loader: 'babel-loader',
                query: {
                    compact: false,
                    cacheDirectory: true,
                    presets: ['react']
                }
            }
        ]
    },
    externals: {
        'axios': 'axios',
        'react': 'React',
        'react-router': 'ReactRouter',
        'history': 'History',
        'react-dom': 'ReactDOM'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: ESLINT_CONFIG_FILE
                }
            },
            debug: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.ProvidePlugin({
            bootstrap: 'bootstrap.scss'
        }),
        new webpack.ProvidePlugin({
            d3: 'd3'
        })
    ]
};

module.exports = webpackConfig;
