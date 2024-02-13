import express from 'express'
import { createChat, getAllChat, getChatByEmail, joinChat, leaveChat } from '../controllers/chat.js'

const router = express.Router()
/**
 * @openapi
 * /chat/createChat:
 *  post:
 *     tags:
 *     - chat
 *     description: createChat
 *     parameters:
 *      - name: chatName
 *        in: body
 *        description: chatName
 *        required: true
 *      - name: chatDescription
 *        in: body
 *        description: chatDescription
 *        required: true
 *      - name: ownerEmail
 *        in: body
 *        description: ownerEmail
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/createChat", createChat)
/**
 * @openapi
 * /chat/joinChat:
 *  post:
 *     tags:
 *     - chat
 *     description: joinChat
 *     parameters:
 *      - name: email
 *        in: body
 *        description: email ของคน join
 *        required: true
 *      - name: chatId
 *        in: body
 *        description: chatId
 *        required: true
 *      - name: username
 *        in: body
 *        description: username ของคน join
 *        required: true
 *      - name: chatName
 *        in: body
 *        description: chatName
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/joinChat", joinChat)
/**
 * @openapi
 * /chat/getAllChat:
 *  get:
 *     tags:
 *     - chat
 *     description: getAllChat
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getAllChat", getAllChat)
/**
 * @openapi
 * /chat/getChatByEmail:
 *  get:
 *     tags:
 *     - chat
 *     description: getChatByEmail
 *     parameters:
 *      - name: email
 *        in: params
 *        description: email
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getChatByEmail", getChatByEmail)
/**
 * @openapi
 * /chat/leaveChat:
 *  delete:
 *     tags:
 *     - chat
 *     description: leaveChat
 *     parameters:
 *      - name: email
 *        in: body
 *        description: email
 *        required: true
 *      - name: chatId
 *        in: body
 *        description: chatId
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/leaveChat', leaveChat)

export default router