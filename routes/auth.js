import express from 'express'
import db from '../config/database.js'
import { getUserByUsername } from '../models/user.js';
import { reg } from '../controllers/auth.js';

const router = express()
router.get("/reg", reg);
export default router