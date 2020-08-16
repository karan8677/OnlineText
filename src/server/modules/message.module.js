import mysql from './mysql.module'

const saveGroupMessage = (groupID, fromUserID, message) => {

    return new Promise((resolve, reject) => {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        var sqlCommand = "INSERT INTO GroupMessage(GroupID, FromUserID, Message, Time) VALUES('" +
            groupID + "','" +
            fromUserID + "','" +
            message  + "','" +
            dateTime+ "')"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('SQL error:', err)
            reject(err)
        })
    
    })
}

const getGroupPreloadMessage = (groupID) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                var sqlCommand = "SELECT Account.UserAccount, GroupMessage.Message, GroupMessage.Time " +
                    "FROM GroupMessage " +

                    "INNER JOIN Account " +
                    "ON Account.UserID = GroupMessage.FromUserID " +

                    "WHERE GroupMessage.GroupID = " +
                    groupID +

                    " ORDER BY GroupMessage.MessageID " +
                    "limit 50";

                connection.query(sqlCommand, function (err, result) {

                    if (err) {

                        console.error('SQL error:', err)
                        reject(err)

                    } else {
                        resolve(result);

                    }
                })
                connection.release()
            }
        })

    })
}

const saveFriendMessage = (friendID, fromUserID, message) => {

    return new Promise((resolve, reject) => {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        var sqlCommand = "INSERT INTO FriendMessage(FriendID, FromUserID, Message, Time) VALUES('" +
            friendID + "','" +
            fromUserID + "','" +
            message + "','" +
            dateTime + "')"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('SQL error:', err)
            reject(err)
        })

    })
}

const getFriendPreloadMessage = (friendID) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                var sqlCommand = "SELECT Account.UserAccount, FriendMessage.Message, FriendMessage.Time " +
                    "FROM FriendMessage " +
                    "INNER JOIN Account  " +
                    "ON FriendMessage.FromUserID = Account.UserID " +
                    "WHERE FriendMessage.FriendID = " +
                    friendID +

                    " ORDER BY FriendMessage.MessageID " +
                    "limit 50";

                connection.query(sqlCommand, function (err, result) {

                    if (err) {

                        console.error('SQL error:', err)
                        reject(err)

                    } else {
                        resolve(result);

                    }
                })
                connection.release()
            }
        })

    })
}

export default {
    saveGroupMessage,
    getGroupPreloadMessage,
    saveFriendMessage,
    getFriendPreloadMessage
}