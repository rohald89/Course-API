const express = require('express');
const { authenticateUser } = require('../middleware/authenticate.middleware');
const { getUser, createUser } = require('../controllers/user.controllers');

const router = express.Router();

router.get('/', authenticateUser, getUser);
router.post('/', createUser);

module.exports = router;
