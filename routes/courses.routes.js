const express = require('express');
const { authenticateUser } = require('../middleware/authenticate.middleware');
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses.controllers');

const router = express.Router();

router.route('/').get(getAllCourses).post(authenticateUser, createCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(authenticateUser, updateCourse)
  .delete(authenticateUser, deleteCourse);

module.exports = router;
