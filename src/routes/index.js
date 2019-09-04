import express from 'express';
import user from './userRoutes';
import mentor from './mentorRoutes';
import session from './sessionRoutes';

const router = express.Router();

router.use('/api/v1/auth', user);
router.use('/api/v1/mentors', mentor);
router.use('/api/v1/sessions', session);
export default router;
