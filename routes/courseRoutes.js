const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
} = require('../controllers/courseControllers');
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

/**
 * POST /api/courses
 * Create a new course
 * Authentication required
 */
router.post('/', authenticateUser, createCourse);

/**
 * PUT /api/courses/:id
 * Update an existing course
 * Authentication required
 */
router.put('/:id', authenticateUser, updateCourse);

module.exports = router;
