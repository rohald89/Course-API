// send 404 if no other route matched
const notFound = (req, res, next) => {
  const err = new Error(`The page you're looking for can't be found`);
  err.status = 404;
  next(err);
};

// setup a global error handler
const errorHandler = (err, req, res, next) => {
  // catch Sequelize validationError
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(err => err.message);
    res.status(400).json({
      message: errors,
    });
  } else {
    // default to 500 server error
    res.status(err.status || 500).json({
      message: err.message,
      error: {},
    });
  }
};

module.exports = { notFound, errorHandler };
