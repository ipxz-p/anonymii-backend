import db from "../config/database.js"


export const sendMessage = (req, res) => {
    const {
        message,
        chatId,
        senderEmail
    } = req.body
    if(!message || !chatId || !senderEmail){
        return res.status(400).json({
            message: "Please enter message, chatId and senderEmail"
        })
    }
    db.query(`insert into messages (message, chatId, senderEmail) 
    values (?, ?, ?);`,
    [message, chatId, senderEmail])
    res.status(200).json({
        message: "Success"
    })
}

export const getMessages = (req, res) => {
    const chatId = req.query.chatId
    if(!chatId){
        return res.status(400).json({
            message: "Please enter chatId"
        })
    }
    db.query(`SELECT messages.*, users.username FROM messages join users on 
    users.email = messages.senderEmail
    where chatId = ?;`,
    [chatId],
    function(err, results){
        if(err) return res.status(400).json(err)
        res.status(200).json(results);
    })
}