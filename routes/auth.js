import express from 'express'
import db from '../config/database.js'
import { getUserByUsername } from '../models/user.js';

const router = express()
router.get("/reg", (req, res) => {
    const username = "pong"
    try {
        getUserByUsername(username, (err, results) => {
            if(err){
                res.send(err)
            }else{
                res.json(results)
            }
        })        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
export default router