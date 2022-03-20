const req = require('express/lib/request');
const { asyncHandler } = require('../middleware/asyncHandler');
const { Course, User } = require('../models');

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
    },
  });
  res.json(courses);
});

const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
    },
  });
  res.json(course);
});

module.exports = { getAllCourses, getCourse };
