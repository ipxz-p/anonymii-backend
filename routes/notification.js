import express from "express"
import { getNotification } from "../controllers/notification.js"

const router = express.Router()

router.get("/getNotification", getNotification)
// router.get('/:chatId', getMessages)

export default router