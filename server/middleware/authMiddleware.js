import jwt from 'jsonwebtoken'; // Import the JSON Web Token library
import asyncHandler from 'express-async-handler'; // Import the async route handler
import User from '../models/userModels.js'; // Import the User model

// Middleware to protect routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Retrieve the JWT token from the 'jwt' cookie in the request
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify and decode the JWT token using the JWT_SECRET_KEY
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find the user associated with the decoded user ID and exclude the password field
      req.user = await User.findById(decoded.userId).select('-password');

      // Call the next middleware or route handler
      next();
    } catch (error) {
      // Handle token verification errors by sending a 401 Unauthorized response
      res.status(401);
      throw new Error('Invalid Token');
    }
  } else {
    // If no token is found, send a 401 Unauthorized response
    res.status(401);
    throw new Error('Not authorized');
  }
});

export default protect; // Export the protect middleware
