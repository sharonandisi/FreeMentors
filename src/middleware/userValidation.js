import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
  static async validateSignup(req, res, next) {
    try {
      const schema = {
        firstname: Joi.string()
          .min(3)
          .max(15)
          .required()
          .error(() => 'Firstname is required with a min of 3 chars and no special chars or numbers'),
        lastname: Joi.string()
          .min(3)
          .max(15)
          .required()
          .error(() => 'Lastname is required with a min of 3 chars and no special chars or numbers'),
        password: Joi.string()
          .min(5)
          .max(15)
          .alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),
        address: Joi.string()
          .alphanum()
          .min(5)
          .max(50)
          .required()
          .error(() => 'Address is a required field with a min of 3 chars'),
        email: Joi.string()
          .email({ minDomainSegments: 2 })
          .required()
          .error(() => 'Email is a required and must be valid'),
        occupation: Joi.string()
          .min(5)
          .max(50)
          .required()
          .error(() => 'Occupation is a required field with a min of 3 chars with no special chars and numbers'),
        bio: Joi.string()
          .min(5)
          .max(50)
          .required()
          .error(() => 'Bio is a required field with a min of 5 chars with no special chars or numbers'),
        expertise: Joi.string()
          .min(5)
          .max(50)
          .required()
          .error(() => 'Expertise is a required field with a min of 3 chars with no special chars and numbers'),
        mentorstatus: Joi.boolean()
          .required()
          .error(() => 'mentorstatus required. Can either be true or false'),
        is_Admin: Joi.boolean()
          .required()
          .error(() => 'is_Admin required. Can either be true or false')
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return response.validationsError(400, error.details[0].message, res);
      }
      next();
    } catch (error) {
      return response.catchErrors(500, error.toString(), res);
    }
  }

  static async validateLogin(req, res, next) {
    try {
      const schema = {
        email: Joi.string()
          .email({
            minDomainSegments:2 }).required()
          .error(() => 'Email is a required field and must be valid'),
        password: Joi.string()
          .min(5)
          .max(15)
          .alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),
      };
      const { error } = Joi.validate(req.body, schema);

      if (error) {
        return response.validationsError(400, error.details[0].message, res);
      }
      next();
    } catch (error) {
      return response.catchErrors(500, error.toString(), res);
    }
  }
}

export default Validations;
