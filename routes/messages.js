import express from "express"
import { getMessages, sendMessage } from "../controllers/messages.js"

const router = express.Router()

router.post("/sendMessage", sendMessage)
router.get('/getMessages', getMessages)

export default router