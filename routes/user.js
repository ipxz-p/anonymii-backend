import express from "express"
import { getUser, updateUser } from "../controllers/user.js"

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
/**
 * @openapi
 * /user/getUser:
 *  get:
 *     tags:
 *     - user
 *     description: getUser
 *     parameters:
 *      - name: email
 *        in: params
 *        description: email
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getUser', getUser)

export default router