import express from "express";
import Session from "../controllers/sessionController";
import Verify from "../middleware/verification";

const router = express.Router();

router.post('/sessions', Verify.verifyauthenUser,Session.createsession);
router.patch('/sessions/:sessionid/accept', Verify.verifyauthenUser, Verify.verifymentor, Verify.verifysession, Session.acceptRequest);

export default router;