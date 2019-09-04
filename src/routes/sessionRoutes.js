import express from "express";
import Session from "../controllers/sessionController";
import Verify from "../middleware/verification";

const router = express.Router();

router.post('/sessions', Verify.verifyauthenUser, Verify.verifymentor, Session.createsession);