const express = require('express');
const router = express.Router();
const { getAllCourses, getCourse } = require('../controllers/courseControllers');
const { authenticateUser } = require('../middleware/authenticateUser');

/**
 * GET /api/courses
 * Returns all courses.
 */
router.get('/', getAllCourses);

/**
 * Get /api/courses/:id
 * Returns a course by id.
 */
router.get('/:id', getCourse);

module.exports = router;
