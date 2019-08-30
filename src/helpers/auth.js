import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../config';


dotenv.config();
const env = process.env.NODE_ENV;

const authHelper = {
  /**
     * Hash Password Method
     * @param {string} password
     * @return {string} return hashed password
     */

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  /**
     * compare Password
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean}
     */

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  /**
     * isValidEmail helper method
     * @param {string} email
     * @returns {Boolean} True or false
     */

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
      * Generate Token
      * @param {string} is
      * @returns {string} token
      */

  generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET);
    return token;
  },
};

export default authHelper;
