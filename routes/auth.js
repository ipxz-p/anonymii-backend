import express from 'express'
import { login, reg } from '../controllers/auth.js';

const router = express.Router()
/**
 * @openapi
 * /auth/reg:
 *  post:
 *     tags:
 *     - auth
 *     description: Register
 *     parameters:
 *      - name: username
 *        in: body
 *        description: username
 *        required: true
 *      - name: email
 *        in: body
 *        description: email
 *        required: true
 *      - name: userPassword
 *        in: body
 *        description: userPassword
 *        required: true
 *      - name: confirmUserPassword
 *        in: body
 *        description: confirmUserPassword
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/reg", reg);
/**
 * @openapi
 * /auth/login:
 *  post:
 *     tags:
 *     - auth
 *     description: Login
 *     parameters:
 *      - name: email
 *        in: body
 *        description: email
 *        required: true
 *      - name: userPassword
 *        in: body
 *        description: userPassword
 *        required: true
 *     responses:
 *       200:
 *         description: userData and accessToken
 */
router.post("/login", login);
export default router