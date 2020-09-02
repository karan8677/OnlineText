import mysql from './mysql.module'

const saveGroupMessage = (groupID, fromUserID, message, time) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "INSERT INTO GroupMessage(GroupID, FromUserID, Message, Time) VALUES('" +
            groupID + "','" +
            fromUserID + "','" +
            message  + "','" +
            time+ "')"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('saveGroupMessage error:', err)
            reject(err)
        })
    
    })
}

const getGroupMessage = (groupID, MessageID) => {

    return new Promise((resolve, reject) => {

        var upper = Number(MessageID) + 50;
        var lower = Number(MessageID);
         
        var sqlCommand = "SELECT Account.UserAccount AS fromUserName, "+
                        "GroupMessage.Message AS message, "+
                        "GroupMessage.Time AS time, " +
                        "GroupMessage.GroupID AS groupID " +
            "FROM GroupMessage " +

            "INNER JOIN Account " +
            "ON Account.UserID = GroupMessage.FromUserID " +

            "WHERE GroupMessage.GroupID = " +
            groupID +
            " ORDER BY GroupMessage.MessageID limit " + MessageID + "," + (MessageID+50)

        mysql.mysqlCommand(sqlCommand)
        .then(result =>{

            resolve(result)

        }).catch(err =>{

            console.error('getGroupMessage error:', err)
            reject(err)

        })

    })
}

const saveFriendMessage = (friendID, fromUserID, message, time) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "INSERT INTO FriendMessage(FriendID, FromUserID, Message, Time) VALUES('" +
            friendID + "','" +
            fromUserID + "','" +
            message + "','" +
            time + "')"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('saveFriendMessage error:', err)
            reject(err)
        })

    })
}

const getFriendMessage = (friendID, messageID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT Account.UserAccount AS fromUserName, "+
        "FriendMessage.Message AS message, " +
            "FriendMessage.Time AS time, " +
            "FriendMessage.FriendID AS friendID " +
            "FROM FriendMessage " +
            "INNER JOIN Account  " +
            "ON FriendMessage.FromUserID = Account.UserID " +
            "WHERE FriendMessage.FriendID = " +
            friendID +
            " ORDER BY FriendMessage.MessageID limit " + messageID + "," + (messageID + 50)

        mysql.mysqlCommand(sqlCommand).then(result => {
            resolve(result);

        }).catch(err => {

            console.error('getFriendMessage error:', err)
            reject(err)

        })
    })
}




const getFriend = (friendID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT * FROM FriendList " +
            "WHERE FriendList.FriendID = " + friendID
             
        mysql.mysqlCommand(sqlCommand).then(result => {
            resolve(result);

        }).catch(err => {

            console.error('getFriendMessage error:', err)
            reject(err)

        })
    })
}

export default {
    saveGroupMessage,
    getGroupMessage,
    saveFriendMessage,
    getFriendMessage,
    
    getFriend
}