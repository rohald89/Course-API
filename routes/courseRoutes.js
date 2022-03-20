const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseControllers');
const { authenticateUser } = require('../middleware/authenticateUser');

router.route('/').get(getAllCourses).post(authenticateUser, createCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(authenticateUser, updateCourse)
  .delete(authenticateUser, deleteCourse);

module.exports = router;
