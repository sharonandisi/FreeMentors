import express from 'express';
import user from './userRoutes';


const router = express.Router();
router.use('/api/v1/auth', user);


export default router;
