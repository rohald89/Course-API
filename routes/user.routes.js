const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/user.controllers');
const { authenticateUser } = require('../middleware/authenticate.middleware');

/**
 * GET /api/users
 * Returns the currently logged in user.
 * Requires authentication.
 */
router.get('/', authenticateUser, getUser);

/**
 * POST /api/users
 * Creates a new user.
 */
router.post('/', createUser);

module.exports = router;
