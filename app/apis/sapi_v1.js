import Disk from '../models/disk';

const IsAuthenticated = (authority) => {
  return (req, res, next) => {
    if ((
        typeof authority === 'undefined'
        && req.isAuthenticated()
      ) || (
        typeof authority !== 'undefined'
        && authority >= req.user.authority
    )) {
      return next();
    }

    console.log('Unauthorized API attempt');
    res.json({ error: 'Authentication failed.' });
    return false;
  };
};

const Api = (router) => {
  router.get('/auth', IsAuthenticated(3), (req, res) => {
    res.json({
      authority: req.user.authority,
      username: req.user.username,
    });
  });

  router.get('/disk/:id', IsAuthenticated(3), (req, res) => {
    if (req.params.id === 'all') {
      Disk.find({}, '-attr-section', (err, result) => {
        res.json(result);
      });
    }
  });

  return router;
};

export default Api;
