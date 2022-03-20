const express = require('express');
const router = express.Router();
const { getUser, createUser } = require('../controllers/userControllers');
const { authenticateUser } = require('../middleware/authenticateUser');

/**
 * GET /api/users
 * Returns the currently logged in user.
 */
router.get('/', authenticateUser, getUser);

/**
 * POST /api/users
 * Creates a new user.
 */
router.post('/', createUser);

module.exports = router;
