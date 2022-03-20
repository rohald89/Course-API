'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

// create the Express app
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
// app.use('/api/courses', courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  console.log(err.name);
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
});

// Check database connection.
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
