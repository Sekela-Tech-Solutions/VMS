const express = require('express');
const app = express();
const authRouter = require('./routes/auth.route');
const breadRouter = require('./routes/vehicle.route');

const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');

const morgan = require('./config/morgan');
app.use(morgan.errorHandler);
app.use(morgan.successHandler);

app.use(express.json());
app.use(authRouter);
app.use(breadRouter);
 
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
 
app.use(errorConverter);
app.use(errorHandler);
 
module.exports = app;