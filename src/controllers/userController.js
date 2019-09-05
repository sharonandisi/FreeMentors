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
        is_Admin: user.isAdmin,
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
    const user = UserModel.findOne(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'Invalid user'
      })
    }
    if (user) {
      const updatedMentor = UserModel.changeMentor(req.params.id, req.body)
      return res.status(200).json({
        status: 200,
        message: 'User successfully changed to mentor',
        data: updatedMentor,
      });
    }
    
  }
}

export default User;
