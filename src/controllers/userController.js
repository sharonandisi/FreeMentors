import UserModel from '../models/userModel';
import authHelper from '../helpers/auth';


class User {
  /**
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

  static async create(req, res) {
    const {
      firstname, lastname, email, password, address, occupation, bio, expertise,
    } = req.body;

    const hashpassword = authHelper.hashPassword(req.body.password);

    const user = UserModel.create({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      password: hashpassword,
      address: address.trim(),
      occupation: occupation.trim(),
      bio: bio.trim(),
      expertise: expertise.trim(),
    });
    const token = authHelper.generateToken(user.id);
    return res.status(201).json({
      status: 201,
      message: 'successful',
      data: {
        token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.firstname,
        email: user.email,
        address: user.address,
        occupation: user.occupation,
        bio: user.bio,
        expertise: user.expertise,
        mentorstatus: user.mentorstatus,
        is_Admin: user.is_Admin,
      },
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  static async userLogin(req, res) {
    const user = UserModel.findByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing',
      });
    }
    if (!authHelper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a valid email address',
      });
    }

    const token = authHelper.generateToken(user.id);
    return res.status(200).json({
      status: 200,
      message: 'user is successfully logged in',
      data: {
        token,
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        occupation: user.occupation,
        mentorstatus: user.mentorstatus,
      },
    });
  }

  /**
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */

  static async changeMentor(req, res) {
    const userid = UserModel.findOne(req.params.id);
    console.log(userid);
    if (userid) {
      const result = UserModel.changeMentor(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        message: 'User successfully changed to mentor',
        data: result,
      });
    }
    if (!userid) {
      return res.status(404).json({
        status: 404,
        error: 'Invalid user',
      });
    }
  }
}

export default User;
