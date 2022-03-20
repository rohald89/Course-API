const express = require('express');
const { getUser } = require('../controllers/userControllers');
const router = express.Router();
const { authenticateUser } = require('../middleware/authenticateUser');
const { User } = require('../models');

/**
 * GET /api/users
 * Returns the currently logged in user.
 */
router.get('/', authenticateUser, getUser);

module.exports = router;
