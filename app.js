// 1. Load environment variables from .env
require('dotenv').config();

// Optional debug
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');
const {
  unknownEndpoint,
  errorHandler,
} = require('./middleware/customMiddleware');
const connectDB = require('./config/db');
const morgan = require('morgan');

// 2. Connect to MongoDB
connectDB();

// 3. Middleware
app.use(morgan('dev'));
app.use(express.json());

// 4. Routes
app.use('/api/tours', tourRouter);
app.use('/api/users', userRouter);

// Example error test route
app.get('/error', (req, res, next) => {
  const error = new Error('Network problem');
  next(error);
});

// 5. Unknown endpoint handler
app.use(unknownEndpoint);

// 6. Error handler
app.use(errorHandler);

// 7. Port
const port = process.env.PORT || 4000;

// 8. Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
