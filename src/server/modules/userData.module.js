import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const getUserRoom = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {
                reject(connectionError)

            } else {

                var sqlCommand = "SELECT chatroom.RoomID, chatroom.Time, member.UserID, chatroom.RoomName " +
                    "FROM member " +
                    "INNER JOIN chatroom " +
                    "ON chatroom.RoomID = member.RoomID " +
                    "WHERE member.UserID = " +
                    insertValues.UserID

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

const getUserFriend = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "SELECT Friend.UserID1 " +
                    "FROM Account " +
                    "INNER JOIN Friend " +
                    "ON Friend.UserID2 = Account.UserID " +
                    "WHERE member.UserID2 = " +
                    insertValues.UserID +

                    " UNION SELECT Friend.UserID2 " +
                    "FROM Account " +
                    "INNER JOIN Friend " +
                    "ON Friend.UserID1 = Account.UserID " +
                    "WHERE member.UserID1 = " +
                    insertValues.UserID +

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


const getUserID = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "SELECT UserID FROM Account WHERE UserAccount = '" + insertValues + "'"
                connection.query(sqlCommand, function (err, result) {
                    var resultPackage = {}
                    if (err) {

                        console.error('SQL error:', err)
                        reject(err)

                    } else {

                        resolve(result[0]);

                    }
                })

                connection.release()

            }
        })

    })
}

const getUserName = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "SELECT UserID FROM Account WHERE UserAccount = '" + insertValues._id + "'"
                connection.query(sqlCommand, function (err, result) {
                    if (err) {

                        console.error('SQL error:', err)
                        reject(err)

                    } else {

                        resolve(result[0]);

                    }
                })

                connection.release()

            }
        })

    })
}

export default {
    getUserRoom,
    getUserFriend,
    getUserName,
    getUserID
}
