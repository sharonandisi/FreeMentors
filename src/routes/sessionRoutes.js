import express from "express";
import Session from "../controllers/sessionController";
import Verify from "../middleware/verification";

const router = express.Router();

router.post('/sessions', Verify.verifyauthenUser,Session.createsession);
router.post('/sessions/:sessionId/accept', Verify.verifyauthenUser, Verify.verifymentor, Verify.verifysession, Session.acceptRequest);