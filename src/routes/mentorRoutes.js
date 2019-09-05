import express from 'express';
import Mentor from '../controllers/mentorController';
import Verify from '../middleware/verification';

const router = express.Router();

router.get('/mentors',  Verify.verifyauthenUser, Mentor.fetchAllMentors);
router.get('/:mentorid',  Verify.verifyauthenUser, Mentor.fetchSpecificMentor)

export default router;