const { asyncHandler } = require('../middleware/asynchandler.middleware');
const { User } = require('../models');

const getUser = (req, res) => {
  const user = req.currentUser;
  res.json(user);
};

const createUser = asyncHandler(async (req, res) => {
  const newUser = req.body;
  await User.create(newUser);
  res.location('/').status(201).end();
});

module.exports = { getUser, createUser };
