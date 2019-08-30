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
};

export default User;
