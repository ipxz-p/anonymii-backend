import db from "../config/database.js"
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

export const reg = (req, res) => {
    try {
        const {
            username,
            email,
            userPassword,
            confirmUserPassword
        } = req.body
        db.query("SELECT * FROM `users` WHERE `email` = ?", 
        [email],
        function(err, results){
            if(err) throw err;
            if (results.length){
                return res.status(400).json({message: "Email already exist"})
            }
            else{
                const hashPassword = bcrypt.hashSync(userPassword, 10)
                db.query("insert into `users` (`username`, `email`, `userPassword`) values(?, ?, ?)",
                [username, email, hashPassword])
                res.status(200).json({
                    message: "Success"
                })
            }
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const login = (req, res) => {
    try {
        const {
            email,
            userPassword
        } = req.body
        db.query("select * from `users` where `email` = ?",
        [email],
        async function (err, results){
            if(err) throw err;
            if (!results.length){
                return res.status(400).json({message: "Username or password incorrect"})
            }
            const match = await bcrypt.compare(userPassword, results[0].userPassword)
            if(!match){
                return res.status(400).json({message: "Email or password incorrect"})
            }
            let accessToken = jwt.sign({
                username: results[0].username,
                email: results[0].email,
                images: results[0].images
            }, process.env.ACCESS_TOKEN, {
                expiresIn: 84600
            })
            res.status(200).json({
                accessToken: accessToken
            })
        })
    } catch (error) {
        res.status(500).json(error)
    }
}