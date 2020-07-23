import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const getFriendInvite = (toUserID) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "SELECT Account.UserAccount " +
                    "FROM Account " +

                    "INNER JOIN friendInvite " +
                    "ON friendInvite.fromUserID = Account.userID " +

                    "WHERE friendInvite.toUserID =" +
                    toUserID 

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

const deleteFriendInvite = (toUserID, fromUserID)=>{
    
    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "DELETE FROM friendInvite " + 
                "WHERE toUserID = " + toUserID + " AND ";
                "WHERE fromUserID = " + fromUserID 

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

const postFriendInvite = (toUserID, fromUserID)=>{
    
    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "INSERT INTO friendInvite(toUserID, fromUserID) VALUES('" +
                    toUserID + "','" +
                    fromUserID + "')"


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

const getGroupInvite = (userID) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "SELECT ChatRoom.RoomName " +
                    "FROM ChatRoom " +

                    "INNER JOIN groupInvite " +
                    "ON groupInvite.groupID = ChatRoom.RoomID " +

                    "WHERE groupInvite.userID =" +
                    userID 

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

const deleteGroupInvite = (userID, groupID)=>{
    
    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "DELETE FROM groupInvite " + 
                "WHERE userID = " + userID + " AND ";
                "WHERE groupID = " + groupID 

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

const postGroupInvite = (userID, groupID)=>{
    
    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "INSERT INTO groupInvite(userID, groupID) VALUES('" +
                    userID + "','" +
                    groupID + "')"


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

export default{
    getFriendInvite,
    deleteFriendInvite,
    postFriendInvite,
    getGroupInvite,
    deleteGroupInvite,
    postGroupInvite
}