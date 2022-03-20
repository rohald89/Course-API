'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const cors = require('cors');
const userRoutes = require('./routes/user.routes.js');
const courseRoutes = require('./routes/courses.routes.js');
const { notFound, errorHandler } = require('./middleware/error.middleware');
// create the Express app
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.use(notFound);
app.use(errorHandler);

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
