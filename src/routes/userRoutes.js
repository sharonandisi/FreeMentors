import express from 'express';
import User from '../controllers/userController';
import Validations from '../middleware/userValidation';
import Verify from '../middleware/verification';

const router = express.Router();

router.post('/signup', Validations.validateSignup, Verify.verifyUser, User.create);
router.post('/signin', Validations.validateLogin, User.userLogin);
router.patch('/:userid', User.changeMentor);
export default router;
