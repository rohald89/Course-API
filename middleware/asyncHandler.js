exports.asyncHandler = cb => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      console.log(err.name);
      if (
        err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError'
      ) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        next(err);
      }
    }
  };
};
