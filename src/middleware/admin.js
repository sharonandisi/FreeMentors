import authHelper from '../helpers/auth';
import User from '../models/userModel';
import '../../.env';

const admin = (req, res, next) => {
  const user = User.findAdmin();

  const hashpassword = authHelper.hashPassword(process.env.ADMIN_PASSWORD);
  if (!user) {
    user.createAdmin({
      firstname: 'admin',
      lastname: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: hashpassword,
      address: 'Nairobi',
      occupation: 'Admin',
      expertise: 'admin',
      bio: 'I am an admin',
    });
  }
  next();
};

export default admin;
