import PATH from 'path';

import express from 'express';
import nconf from 'nconf';

import baseManager from './base-manager';

const ROOT = '../';

const assetsManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app) {
    const staticFolders = nconf.get('staticFolders');
    const adjustedFolders = this.adjustStaticFolders(staticFolders, app.get('root'));

    adjustedFolders.forEach((folder) => {
      app.use(nconf.get('staticFolderMount'), express.static(folder, {
        maxAge: nconf.get('maxAge'),
      }));
    });
  },

  adjustStaticFolders(folders) {
    const adjustedFolders = folders.map((folder) => {
      return PATH.resolve(__dirname, ROOT, folder);
    });

    return adjustedFolders;
  },
});

export default assetsManager;
