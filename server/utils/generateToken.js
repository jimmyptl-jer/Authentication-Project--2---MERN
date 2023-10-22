import jwt from 'jsonwebtoken';

// Function to generate and set a JWT token as an HTTP-only cookie
const generateToken = (res, userId) => {
  // Generate a JWT token with the user's ID
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d', // Token will expire in 30 days
  });

  // Set the JWT token as an HTTP-only cookie with secure options
  res.cookie('jwt', token, {
    httpOnly: true, // Cannot be accessed through client-side JavaScript
    secure: process.env.NODE_ENV !== 'development', // Secure flag for HTTPS in production
    sameSite: 'strict', // Protect against cross-site request forgery (CSRF) attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Maximum age of the cookie (30 days)
  });
};

export default generateToken;
