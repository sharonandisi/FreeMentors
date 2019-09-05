import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
static async validateSession(req, res, next) {
   try { const schema = {
        mentorid: Joi.string()
            .min(3)
            .max(20)
            .required()
            .error(() => 'mentorid is a required field'),
        questions: Joi.string()
            .min(3)
            .max(15)
            .required()
            .error(() => 'Firstname is required with a min of 3 chars and no special chars or numbers'),
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