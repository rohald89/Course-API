'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

exports.authenticateUser = async (req, res, next) => {
  const credentials = auth(req);
  console.log(credentials);
  next();
};
