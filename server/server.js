const express = require('express');
const app = express();
const authRouter = require('./routes/auth.route');
const vehicleRouter = require('./routes/vehicle.route');
const swaggerUi = require('swagger-ui-express');

const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const swaggerSpec = require('./swagger/swagger');

const morgan = require('./config/morgan');
app.use(morgan.errorHandler);
app.use(morgan.successHandler);

app.use(express.json());
app.use(authRouter);
app.use(vehicleRouter);
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
 
app.use(errorConverter);
app.use(errorHandler);
 
module.exports = app;