import compression from 'compression';
import nconf from 'nconf';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import baseManager from './base-manager';

const middlewareManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app) {
    app.use(compression({ threshold: nconf.get('compressionThreshold') }));

    // to allow caching in-browser (mostly for libs), but still not to cache dev. files
    app.use((req, res, next) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      next();
    });

    app.use(morgan('dev'));

    app.use(bodyParser.json({ type: ['application/vnd.api+json', 'application/json'] }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
  },
});

export default middlewareManager;
