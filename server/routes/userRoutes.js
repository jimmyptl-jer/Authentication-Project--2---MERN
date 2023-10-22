import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  logoutUser,
  updateUserProfile
} from '../controllers/userController.js'; // Import controller functions

import protect from '../middleware/authMiddleware.js'; // Import authentication middleware

// Create an Express.js router instance
const router = express.Router();

// Define the routes and associate them with the corresponding controller functions

// POST /api/users/ - Register a user
router.post('/', registerUser);

// POST /api/users/auth - Authenticate a user and set a token
router.post('/auth', authUser);

// POST /api/users/logout - Log out a user
router.post('/logout', logoutUser);

// GET /api/users/profile - Get user profile (Protected route, requires authentication)
router.get('/profile', protect, getUserProfile);

// PUT /api/users/profile - Update user profile (Protected route, requires authentication)
router.put('/profile', protect, updateUserProfile);

// Export the router to be used in your main application
export default router;
