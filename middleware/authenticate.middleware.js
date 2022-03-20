'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
  let message = null;

  const credentials = auth(req);
  console.log(credentials);

  if (credentials) {
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name,
      },
    });
    // console.log(user);
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        req.currentUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
        };
      } else {
        message = `Authentication failure for username: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};
