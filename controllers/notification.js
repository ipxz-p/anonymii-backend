import db from "../config/database.js";

export const getNotification = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({
                message: "Please enter email"
            });
        }
        db.query(
            "SELECT message FROM notifications " +
            "JOIN member_in_chat_room ON notifications.chatId = member_in_chat_room.chatId " +
            "AND member_in_chat_room.email = ? " +
            "AND notifications.joinerEmail != ? " +
            "AND member_in_chat_room.memberAtTimestamp <= notifications.joinAtTimestamp " +
            "ORDER BY notifications.id DESC;",
            [email, email],
            function (err, results) {
                if(err) throw err;
                res.status(200).json(results);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Internal Server Error"
        });
    }
};
