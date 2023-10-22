// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set response status code to 404
  next(error); // Pass the error to the next middleware
};

// Middleware for handling errors and sending appropriate responses
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Determine the HTTP status code
  let message = err.message; // Initialize the error message

  // Check if the error is a "CastError" and the kind is "ObjectId"
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404; // If it's a CastError, set the status code to 404 (Resource not found)
    message = "Resource not found"; // Update the error message
  }

  // Send a JSON response with the appropriate status code and error message
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Include the stack trace (if not in production)
  });
};

// Export the middleware functions for use in other parts of the application
export {
  notFound,
  errorHandler
};
