import express from 'express'
import { createChat, joinChat } from '../controllers/chat.js'

const router = express.Router()

router.post("/createChat", createChat)
router.post("/joinChat", joinChat)
// router.get("/:userId", userChats)
// router.get("/find/:firstId/:secondId", findChat)

export default router