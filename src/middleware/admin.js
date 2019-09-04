import authHelper from '../helpers/auth';
import userModel from '../models/userModel';
import '../../config';



const createAdmin = (req, res, next) => {
  const user = userModel.findAdmin();
  const hashpassword = authHelper.hashPassword(process.env.ADMIN_PASSWORD);
  if (!user) {
    userModel.createAdmin({
      firstname: 'admin',
      lastname: 'admin',
      email: process.env.ADMIN_EMAIL,
      password: hashpassword,
      address: 'Nairobi',
      occupation: 'Admin',
      expertise: 'admin',
      bio: 'I am an admin',
      mentorstatus: false,
      isAdmin: true,
    });
  }
  next();
};

export default createAdmin;
