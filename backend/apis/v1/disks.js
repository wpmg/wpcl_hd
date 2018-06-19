import mongoose from 'mongoose';

import Disk from '../../models/disk';

const jsonApiMediaType = 'application/vnd.api+json';
const headerContentTypeJsonApiMediaType = { 'Content-Type': jsonApiMediaType };
const headerWwwAuthenticate = { 'WWW-Authenticate': 'FormBased' };

const routerDisks = (router, IsAuthenticated) => {
  router.get('/disks/:id', IsAuthenticated(3), (req, res) => {
    if (req.params.id === 'all') {
      const result = [];
      Disk.find({}, '-attr_section -info_section').cursor()
        .on('data', (disk) => {
          result.push({
            type: 'disks',
            id: disk._id,
            attributes: {
              'Device Model': disk['Device Model'],
              'Serial Number': disk['Serial Number'],
              added: disk.added,
              updated: disk.updated,
              location: disk.location,
              customText: disk.customText,
              internal_name: disk.internal_name,
            },
            links: {
              self: `/disks/${disk._id}`,
            },
            relationships: {
              attributes_section: {
                links: {
                  self: `/disks/${disk._id}/relationships/attributes`,
                },
              },
              information_section: {
                links: {
                  self: `/disks/${disk._id}/relationships/information`,
                },
              },
            },
          });
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
};

export default routerDisks;
