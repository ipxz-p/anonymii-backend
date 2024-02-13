import express from "express"
import { updateUser } from "../controllers/user.js"

const router = express.Router()

/**
 * @openapi
 * /user/updateUser:
 *  put:
 *     tags:
 *     - user
 *     description: updateUser
 *     parameters:
 *      - name: email
 *        in: body
 *        description: email
 *        required: true
 *      - name: username
 *        in: body
 *        description: username
 *        required: true
 *      - name: images
 *        in: body
 *        description: images
 *      - name: oldUserPassword
 *        in: body
 *        description: oldUserPassword
 *      - name: newUserPassword
 *        in: body
 *        description: newUserPassword
 *     responses:
 *       200:
 *         description: Success
 */
router.put("/updateUser", updateUser)
// router.get('/:chatId', getMessages)

export default router