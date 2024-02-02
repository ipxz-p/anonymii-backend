import db from "../config/database.js"

export const getUserByUsername = (username, result) => {
    db.query("select * from users where username = ?",
    username,
    (err, results) => {
        if(err){
            return result(err, null)
        }
        else{
            return result(null, results)
        }
    })
}