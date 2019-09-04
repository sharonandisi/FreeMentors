import express from 'express';
import user from './userRoutes';
import mentor from './mentorRoutes';

const router = express.Router();

router.use('/api/v1/auth', user);
router.use('/api/v1/', mentor)
export default router;
