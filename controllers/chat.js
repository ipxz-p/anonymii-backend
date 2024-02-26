import db from "../config/database.js"

export const createChat = async (req, res) => {
    try {
        const {
            chatName,
            chatDescription,
            ownerEmail
        } = req.body
        if (!chatName || !chatDescription || !ownerEmail) {
            return res.status(400).json({
                message: "Please enter chatName, chatDescription and ownerEmail"
            })
        }
        const chatId = await new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO `chat_room` (`chatName`, `chatDescription`, `ownerEmail`) VALUES (?, ?, ?)",
                [chatName, chatDescription, ownerEmail],
                function (err, results) {
                    if (err) reject(err);
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
        if (!email || !chatId || !username || !chatName) {
            return res.status(400).json({
                message: "Please enter email, chatId, username and chatName"
            })
        }
        db.query("SELECT * FROM `member_in_chat_room` where `email` = ? and `chatId` = ?;",
            [email, chatId],
            async function (err, results) {
                if (err) throw err;
                if (results.length) {
                    return res.status(400).json({ message: "You already joined this chat" })
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

export const getAllChat = async (req, res) => {
    try {
        db.query(`SELECT chat_room.*, count(member_in_chat_room.chatId) as user_count,
        (select images from users where email = chat_room.ownerEmail) as ownerImages
        FROM chat_room
        JOIN member_in_chat_room ON chat_room.chatId = member_in_chat_room.chatId
        group by member_in_chat_room.chatId`,
            async function (err, results) {
                if (err) throw err;
                res.status(200).json(results);
            });
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getChatByEmail = async (req, res) => {
    try {
        const email = req.query.email
        db.query(`SELECT chat_room.*, 
        (SELECT COUNT(member_in_chat_room.chatId)
        FROM member_in_chat_room
        WHERE member_in_chat_room.chatId = chat_room.chatId) as user_count,
        (select images from users where email = chat_room.ownerEmail) as ownerImages
        FROM chat_room
        LEFT JOIN messages ON messages.chatId = chat_room.chatId
        WHERE chat_room.chatId IN (
            SELECT chatId
            FROM member_in_chat_room
            WHERE member_in_chat_room.email = ?
        )
        GROUP BY chat_room.chatId
        ORDER BY MAX(messages.messagesTimestamp) DESC;`,
            [email],
            async function (err, results) {
                if (err) throw err;
                res.status(200).json(results);
            });
    } catch (error) {
        res.status(400).json(error);
    }
}

export const leaveChat = (req, res) => {
    try {
        const {
            email,
            chatId,
        } = req.body
        db.query(`DELETE FROM member_in_chat_room
        WHERE email = ? AND chatId = ?;`,
            [email, chatId]);
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        res.status(400).json(error);
    }
}

export const deleteChatroom = (req, res) => {
    try {
        const {
            chatId,
        } = req.body
        db.query(`delete FROM chat_room where chatId = ?;`,
            [chatId]);
        res.status(200).json({
            message: 'Success'
        });
    } catch (error) {
        res.status(400).json(error);
    }
}