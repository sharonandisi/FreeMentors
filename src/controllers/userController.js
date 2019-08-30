import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';


const User = {
  /**
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

  create(req, res) {
    if (!req.body.firstname && !req.body.lastname && !req.body.email && !req.body.password && !req.body.address && !req.body.bio && !req.body.occupation && !req.body.expertise && !req.body.mentorstatus && !req.body.is_Admin) {
      return res.status(400).json({
        status: 400,
        error: 'All fields are required',
      });
    }
    const user = UserModel.create(req.body);
    return res.status(201).json({
      status: 201,
      message: 'successful',
      data: user,
    });
  },

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  userLogin(req, res) {
    const user = UserModel.findByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }
    if (req.body.password !== user.password) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid credentials',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'user is successfully logged in',
      data: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        occupation: user.occupation,
        mentorstatus: user.mentorstatus,
      },
    });
  },
};

export default User;
