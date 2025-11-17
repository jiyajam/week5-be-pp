// 1. Load environment variables from .env
require('dotenv').config();

// (Optional) debug line – you can keep it for now
console.log("DEBUG MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const morgan = require("morgan");

// 2. Connect to MongoDB using config/db.js
connectDB();

// 3. Middleware
app.use(morgan("dev"));
app.use(express.json());

// 4. Routes
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);

// 5. Unknown endpoint handler
app.use(unknownEndpoint);
// app.use(errorHandler); // if you have an error handler later

// 6. Read PORT from .env (or use 4000 as default)
const port = process.env.PORT || 4000;

// 7. Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
