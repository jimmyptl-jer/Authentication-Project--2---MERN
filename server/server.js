import express from 'express'; // Import the Express framework
import dotenv from 'dotenv'; // Import the dotenv library for loading environment variables
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // Import custom error handling middleware
import connectDB from './config/db.js'; // Import the database connection setup
import userRoutes from './routes/userRoutes.js'; // Import the user routes
import cookieParser from 'cookie-parser'; // Import the cookie-parser middleware for handling cookies

// Load environment variables from the .env file
dotenv.config();

// Establish a connection to the MongoDB database
connectDB();

// Define the port where the server will listen (use the provided PORT or default to 5000)
const PORT = process.env.PORT || 5000;

// Create an Express application
const app = express();

// Middleware: Parse incoming JSON requests
app.use(express.json());

// Middleware: Parse URL-encoded requests with extended options
app.use(express.urlencoded({ extended: true }));

// Middleware: Use the cookie-parser middleware to handle cookies
app.use(cookieParser());

// Middleware: Use the userRoutes for handling routes starting with '/api/users'
app.use('/api/users', userRoutes);

// Route: Handle the root URL ('/') with a simple response
app.get('/', (req, res, next) => res.send('Server is Ready'));

// Middleware: Handle 404 Not Found errors using the notFound middleware
app.use(notFound);

// Middleware: Handle other errors using the errorHandler middleware
app.use(errorHandler);

// Start the server and listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
