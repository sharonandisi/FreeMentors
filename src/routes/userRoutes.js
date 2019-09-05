import express from 'express';
import User from '../controllers/userController';
import Validations from '../middleware/userValidation';
import Verify from '../middleware/verification';
import createAdmin from '../middleware/admin'

const router = express.Router();

router.post('/signup', Validations.validateSignup, Verify.verifyUser, User.create);
router.post('/signin', Validations.validateLogin, Verify.verifyRegistereduser, Verify.verifyPassword, createAdmin, User.userLogin);
router.patch('/:id', Verify.verifyauthenUser, Verify.verifyAdmin, User.changeMentor);
export default router;
