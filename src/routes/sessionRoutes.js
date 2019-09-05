import express from "express";
import Session from "../controllers/sessionController";
import Verify from "../middleware/verification";
import Validations from '../middleware/sessionValidation';

const router = express.Router();

router.post('/sessions',Verify.verifyauthenUser, Validations.validateSession,Session.createsession);
router.patch('/sessions/:sessionid/accept', Verify.verifyauthenUser, Verify.verifymentor, Verify.verifysession, Session.acceptRequest);
router.patch('/sessions/:sessionid/reject', Verify.verifyauthenUser, Verify.verifymentor, Verify.verifysession, Session.declineRequest);

export default router;