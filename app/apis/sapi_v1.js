const IsAuthenticated = (authority) => {
  return (req, res, next) => {
    if (typeof authority === 'undefined') {
      if (req.isAuthenticated()) {
        return next();
      }
    } else {
      if(typeof req.user.authority !== 'undefined' && authority >= req.user.authority) {
        return next();
      }
    }
    
    console.log('Unauthorized API attempt');
    res.json({error: 'Authentication failed.'});
  };
};

const Api = (router) => {
  router.get('/disk/:id', IsAuthenticated(3), (req, res) => {
    if (req.params.id === 'all') {
      res.json({
        "disks": [
          {
            "id": "1",
            "name": "hej",
            "temp": "28"
          },
          {
            "id": "2",
            "name": "då",
            "temp": "82"
          }
        ]
      });
    }
  });

  return router;
};

export default Api;

/*



*/
