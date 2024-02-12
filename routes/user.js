import express from "express"
import { updateUser } from "../controllers/user.js"

const router = express.Router()

router.put("/updateUser", updateUser)
// router.get('/:chatId', getMessages)

export default router