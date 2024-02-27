import express from "express"
import { getMessages, sendMessage } from "../controllers/messages.js"

const router = express.Router()
/**
 * @openapi
 * /message/sendMessage:
 *  post:
 *     tags:
 *     - chat
 *     description: sendMessage
 *     parameters:
 *      - name: message
 *        in: body
 *        description: message
 *        required: true
 *      - name: chatId
 *        in: body
 *        description: chatId
 *        required: true
 *      - name: senderEmail
 *        in: body
 *        description: senderEmail
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/sendMessage", sendMessage)
/**
 * @openapi
 * /message/getMessages:
 *  get:
 *     tags:
 *     - chat
 *     description: getMessages
 *     parameters:
 *      - name: chatId
 *        in: params
 *        description: chatId
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getMessages', getMessages)

export default router