const { User } = require('../models');

/**
 * Don't include the createdAt and updatedAt properties of the Course
 * Include the information about the associated user of the Course
 */
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
