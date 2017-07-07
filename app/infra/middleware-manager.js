import compression from 'compression';
import nconf from 'nconf';
import morgan from 'morgan';
import cookie_parser from 'cookie-parser';
import body_parser from 'body-parser';

import baseManager from './base-manager';

const middlewareManager = Object.assign({}, baseManager, {
    configureDevelopmentEnv(app, ...args) {
        app.use(compression({threshold: nconf.get('compressionThreshold')}));

        // to allow caching in-browser (mostly for libs), but still not to cache dev. files
        app.use((req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        });

        app.use(morgan('dev'));

        app.use(body_parser.json());
        app.use(body_parser.urlencoded({ extended: true }));
        app.use(cookie_parser());
    }
});

export default middlewareManager;
