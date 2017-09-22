import mongoose from 'mongoose';

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

  router.get('/disk/:id/attribute/:attrId', IsAuthenticated(3), (req, res) => {
    if (req.params.attrId === 'latest') {
      Disk.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        { $addFields: { 'attr_section.updtime': '$updated' } },
        { $project: { _id: 0, attr_section: 1 } },
        { $unwind: '$attr_section' },
        { $replaceRoot: { newRoot: '$attr_section' } },
        {
          $project: {
            attr_id: 1,
            name: 1,
            thresh: 1,
            attr_type: 1,
            updated: 1,
            failed: 1,
            values: {
              $filter: {
                input: '$values',
                as: 'value',
                cond: { $eq: ['$$value.time', '$$ROOT.updtime'] } },
            },
          },
        },
      ])
      .exec((err, result) => {
        res.json(result);
      });
    }
  });

  router.get('/disk/:id', IsAuthenticated(3), (req, res) => {
    if (req.params.id === 'all') {
      const result = {};
      Disk.find({}, '-attr_section').cursor()
        .on('data', (disk) => {
          result[disk._id] = disk;
        })
        .on('close', () => {
          res.json(result);
        });
    } else {
      Disk.findOne({ _id: req.params.id }, '-attr_section')
        .exec((err, result) => {
          res.json(result);
        });
    }
  });

  return router;
};

export default Api;
