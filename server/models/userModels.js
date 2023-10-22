  import mongoose from 'mongoose';
  import bcrypt from 'bcryptjs';

  const saltRounds = 12;


  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  });

  // Hash the password before saving it to the database
  userSchema.pre('save', async function (next) {
    try {
      // Only hash the password if it's new or modified
      if (!this.isModified('password')) {
        return next();
      }

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(this.password, salt);

      // Set the password field to the hashed password
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }

  const User = mongoose.model('User', userSchema);
  export default User;

  /*In this code:

  We define a pre middleware for the 'save' event on the user schema. This middleware will run before saving a new user or updating an existing user.

  Inside the middleware function, we check if the password field has been modified. If not, we skip hashing the password.

  We generate a salt using bcrypt.genSalt and then hash the user's password using bcrypt.hash.

  Finally, we set the password field in the user document to the hashed password before saving it to the database.*/