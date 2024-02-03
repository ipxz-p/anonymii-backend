import db from "../config/database.js"

export const reg = (req, res) => {
    try {
        db.query("insert into `users` (fullname) values (?)", 
        "456",
        function(err, results){
            if(err){
                res.send(err)
            }else{
                res.json(results)
            }
        })
    } catch (error) {
        console.log(error)
    }
}