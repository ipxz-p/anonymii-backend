import db from "../config/database.js"
import bcrypt from 'bcrypt';

export const updateUser = (req, res) => {
    try {
        const {
            email,
            username,
            images,
            oldUserPassword,
            newUserPassword
        } = req.body
        if(!email || !username){
            return res.status(400).json({
                message: "Please enter email and username"
            })
        }
        db.query("select * from `users` where `email` = ?",
        [email],
        async function (err, results){
            if(err) throw err;
            let hashPassword;
            if(newUserPassword){
                const match = await bcrypt.compare(oldUserPassword, results[0].userPassword)
                if(!match){
                    return res.status(400).json({message: "Password incorrect"})
                }
            }
            hashPassword = newUserPassword ? bcrypt.hashSync(newUserPassword, 10) : results[0].userPassword
            db.query(`UPDATE users
            SET username = ?, images = ?, userPassword = ?
            WHERE email = ?;`, 
            [username, images, hashPassword, email])
            res.status(200).json({
                message: 'Success'
            });
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getUser = (req, res) => {
    try {
        const email = req.query.email
        if(!email){
            return res.status(400).json({
                message: "Please enter email"
            })
        }
        db.query("select username, email, images from `users` where `email` = ?",
        [email],
        async function (err, results){
            if(err) throw err;
            res.status(200).json(results);
        })
    } catch (error) {
        res.status(400).json(error)
    }
}