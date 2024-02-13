import express from "express"
import { getNotification } from "../controllers/notification.js"

const router = express.Router()
/**
 * @openapi
 * /notification/getNotification:
 *  get:
 *     tags:
 *     - notification
 *     description: getNotification
 *     parameters:
 *      - name: email
 *        in: params
 *        description: email
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/getNotification", getNotification)

export default router