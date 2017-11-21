import mongoose from 'mongoose';

import Disk from '../models/disk';

const jsonApiMediaType = 'application/vnd.api+json';
const headerContentTypeJsonApiMediaType = { 'Content-Type': jsonApiMediaType };
const headerWwwAuthenticate = { 'WWW-Authenticate': 'FormBased' };

// Function for checking if user is (1) Authenticated and (2) has proper authority
const IsAuthenticated = (authority) => {
  return (req, res, next) => {
    // Authority levels are (highest) 1, 2, 3 (lowest), where 3 is standard
    const auth = authority || 3;

    // Check if (1) and (2)
    if (
      req.isAuthenticated()
      && auth >= req.user.authority
    ) {
      return next();
    }

    // If !(1), send proper response
    if (!req.isAuthenticated()) {
      console.log(`Unauthorized API attempt: ${req.originalUrl}`);
      res.set(Object.assign({}, headerContentTypeJsonApiMediaType, headerWwwAuthenticate));
      res.status(401).json({
        errors: [{
          status: '401',
          title: 'Authentication failed.',
        }],
      });
      return false;
    }

    // Else, assume !(2)
    console.log(`API action requested with low authority: ${req.user._id}/${req.user.authority} at ${req.originalUrl}`);
    res.set(headerContentTypeJsonApiMediaType);
    res.status(403).json({
      errors: [{
        status: '403',
        title: 'Authority to low to perform requested action.',
      }],
    });
    return false;
  };
};

const Api = (router) => {
  router.get('/authenticate', IsAuthenticated(3), (req, res) => {
    res.set(headerContentTypeJsonApiMediaType);
    res.json({
      data: {
        type: 'users',
        id: req.user._id,
        attributes: {
          username: req.user.username,
          authority: req.user.authority,
        },
      },
    });
  });

  router.get('/disk/:id/attribute/:attrId/all', IsAuthenticated(3), (req, res) => {
    Disk.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $project: { _id: 0, attr_section: 1 } },
      { $unwind: '$attr_section' },
      { $replaceRoot: { newRoot: '$attr_section' } },
      { $match: { attr_id: parseInt(req.params.attrId, 10) } },
      { $project: { values: 1 } },
    ])
    .exec((err, result) => {
      res.set(headerContentTypeJsonApiMediaType);
      res.json(result[0].values);
    });
  });

  router.get('/disk/:id/attribute/:attrId', IsAuthenticated(3), (req, res) => {
    if (req.params.attrId === 'all') {
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
        res.set(headerContentTypeJsonApiMediaType);
        res.json(result);
      });
    }
  });

  router.get('/disk/:id/customText', IsAuthenticated(3), (req, res) => {
    Disk.findOne({ _id: req.params.id }, '-_id customText')
      .exec((err, result) => {
        res.set(headerContentTypeJsonApiMediaType);
        res.json({
          customText: (typeof result.customText === 'undefined') ? '' : result.customText,
        });
      });
  });

  router.put('/disk/:id/customText', IsAuthenticated(2), (req, res) => {
    Disk.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { customText: req.body.customText } },
      { projection: { _id: 0, customText: 1 }, new: true }
    )
      .exec((err, result) => {
        res.set(headerContentTypeJsonApiMediaType);
        res.json({
          customText: (typeof result.customText === 'undefined') ? '' : result.customText,
        });
      });
  });

  router.get('/disk/:id', IsAuthenticated(3), (req, res) => {
    if (req.params.id === 'all') {
      const result = {};
      Disk.find({}, '-attr_section').cursor()
        .on('data', (disk) => {
          result[disk._id] = disk;
        })
        .on('close', () => {
          res.set(headerContentTypeJsonApiMediaType);
          res.json(result);
        });
    } else {
      Disk.findOne({ _id: req.params.id }, '-attr_section')
        .exec((err, result) => {
          res.set(headerContentTypeJsonApiMediaType);
          res.json(result);
        });
    }
  });

  return router;
};

export default Api;
