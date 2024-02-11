import db from "../config/database.js"


export const createChat = async (req, res) => {
    try {
        const {
            chatName,
            chatDescription,
            ownerEmail
        } = req.body
        if(!chatName || !chatDescription || !ownerEmail){
            return res.status(400).json({
                message: "Please enter chatName, chatDescription and ownerEmail"
            })
        }
        const chatId = await new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO `chat_room` (`chatName`, `chatDescription`, `ownerEmail`) VALUES (?, ?, ?)",
                [chatName, chatDescription, ownerEmail],
                function (err, results){
                    if(err) reject(err);
                    resolve(results.insertId);
                }
            );
        });
        db.query(
            "INSERT INTO `member_in_chat_room` (`email`, `chatId`) VALUES (?, ?)",
            [ownerEmail, chatId]
        );
        res.status(200).json({
            message: 'Success'
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const joinChat = async (req, res) => {
    try {
        const {
            email,
            chatId,
            username,
            chatName
        } = req.body
        if(!email || !chatId || !username || !chatName){
            return res.status(400).json({
                message: "Please enter email, chatId, username and chatName"
            })
        }
        db.query("SELECT * FROM `member_in_chat_room` where `email` = ? and `chatId` = ?;",
            [email, chatId],
            async function (err, results){
                if(err) throw err;
                if (results.length){
                    return res.status(400).json({message: "You already joined this chat"})
                }
                db.query(
                    "INSERT INTO `member_in_chat_room` (`email`, `chatId`) VALUES (?, ?)",
                    [email, chatId]
                );

                db.query(
                    "INSERT INTO `notifications` (`joinerEmail`, `message`, `chatId`) VALUES (?, ?, ?)",
                    [email, `user ${username} joined the chat ${chatName}`, chatId]
                );

                res.status(200).json({
                    message: 'Success'
                });
            });
    } catch (error) {
        res.status(400).json(error);
    }
}