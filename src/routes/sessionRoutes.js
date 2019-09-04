import express from "express";
import Session from "../controllers/sessionController";
import Verify from "../middleware/verification";

const router = express.Router();

router.post('/signup', Verify.verifyauthenUser, Verify.verifymentor, Session.createsession);