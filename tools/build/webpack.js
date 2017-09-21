const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');

const compiler = webpack(require('./config/webpack-config'));

const printReport = (stats) => {
  gutil.log('[webpack]', stats.toString({
    modules: false,
    errorDetails: false,
    timings: false,
    cached: false,
    colors: true,
  }));
};

gulp.task('build:app', (callback) => {
  compiler.run((err, stats) => {
    if (err) {
      gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
    callback();
  });
});

gulp.task('build:watch:app', (callback) => {
  compiler.watch({
    aggregateTimeout: 300,
  }, (err, stats) => {
    if (err) {
      gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
  });

  callback();
});
