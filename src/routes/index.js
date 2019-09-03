import express from 'express';
import user from './userRoutes';
import admin from '../middleware/admin';

const router = express.Router();
router.use('api/v1', admin);
router.use('/api/v1/auth', user);

export default router;
