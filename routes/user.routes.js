const express = require('express');
const { authenticateUser } = require('../middleware/authenticate.middleware');
const { getUser, createUser } = require('../controllers/user.controllers');

const router = express.Router();

router.route('/').get(authenticateUser, getUser).post(createUser);

module.exports = router;
