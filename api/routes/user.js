import express from "express";
import {pushEvents, repoDetails} from '../controllers/user.js'


const router = express.Router();

router.post("/push", pushEvents)
router.post("/repo", repoDetails)
export default router