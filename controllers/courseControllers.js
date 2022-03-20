const { asyncHandler } = require('../middleware/asyncHandler');
const { Course, User } = require('../models');
const filterAttributes = require('../helpers/filterAttributes');

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll(filterAttributes);
  res.json(courses);
});

const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id, { ...filterAttributes });
  if (course) {
    res.json(course);
  } else {
    const err = new Error('Course not found');
    err.status = 404;
    next(err);
  }
});

const createCourse = asyncHandler(async (req, res) => {
  const course = await Course.create(req.body);
  res.location(`/courses/${course.id}`).status(201).end();
});

const updateCourse = asyncHandler(async (req, res, next) => {
  // TODO: Do research about this update method. findByPk might be better to check the owner before trying to update it. This might also make it more future proof when adding Admin roles that would allow admins to change courses they aren't the owner of
  const course = await Course.update(req.body, {
    where: {
      id: req.params.id,
      userId: req.currentUser.id,
    },
  });
  if (course[0] < 1) {
    const err = new Error('Only the owner of the course can make changes');
    err.status = 403;
    next(err);
  } else {
    res.status(204).end();
  }
});

module.exports = { getAllCourses, getCourse, createCourse, updateCourse };
