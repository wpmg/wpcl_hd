import express from 'express';

import baseManager from './base-manager';
import apiV1 from '../apis/sapi_v1';

const IsAuthenticated = (req, res, next) => {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) {
    return next();
  }
  // if Ihe user is not authenticated then redirect him to the login page
  res.redirect('/');
  return false;
};

const routeManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app, ...args) {
    const passport = args[0];

    const unAuthenticatedRouter = this.CreateUnAuthenticatedRouter(passport);
    const apiRouterV1 = this.CreateApiRouter_v1();
    const dashboardRouter = this.CreateDashboardRouter(passport);

    app.use('/dashboard', dashboardRouter);
    app.use('/api/v1', apiRouterV1);
    app.use('/', unAuthenticatedRouter);
  },

  CreateUnAuthenticatedRouter(passport) {
    const router = express.Router();

    router.post('/login', passport.authenticate(
      'login',
      {
        successRedirect: '/dashboard',
        failureRedirect: '/',
      }
    ));

    router.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    router.get('*',
      (req, res, next) => {
        if (req.isAuthenticated()) {
          res.redirect(300, '/dashboard');
          return false;
        }

        return next();
      },
      (req, res) => {
        res.render('login_index', { layout: 'login.hbs' });
      }
    );

    return router;
  },

  CreateDashboardRouter() {
    const router = express.Router();

    router.get('/', IsAuthenticated, (req, res) => {
      res.render('index');
    });

    return router;
  },

  CreateApiRouter_v1() {
    const router = express.Router({ strict: true });

    return apiV1(router);
  },
});

export default routeManager;
