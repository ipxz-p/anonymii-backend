import express from 'express'
import { createChat, getAllChat, getChatByEmail, joinChat, leaveChat } from '../controllers/chat.js'

const router = express.Router()

router.post("/createChat", createChat)
router.post("/joinChat", joinChat)
router.get("/getAllChat", getAllChat)
router.get("/getChatByEmail", getChatByEmail)
router.delete('/leaveChat', leaveChat)

export default router