const { User } = require('../models');

const filterAttributes = {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
  include: {
    model: User,
    as: 'user',
    attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
  },
};

module.exports = filterAttributes;
