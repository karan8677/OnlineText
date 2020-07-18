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

                connection.query(sqlCommand, function (error, result) {
                    var resultPackage = {}
                    if (error) {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        resolve(resultPackage);
                        // reject(error)
                    } else {
                        resultPackage["success"] = "success"
                        resultPackage["result"] = result
                        resolve(resultPackage);
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

                var sqlCommand = "SELECT UserID1 FROM Friend WHERE UserID2 ='" +
                    insertValues.memberID +
                    "' " +
                    "UNION SELECT UserID2 FROM Friend WHERE UserID1 ='" +
                    insertValues.memberID +
                    "'"

                connection.query(sqlCommand, function (error, result) {
                    var resultPackage = {}
                    if (error) {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        resolve(resultPackage);
                        // reject(error)
                    } else {
                        resultPackage["success"] = "success"
                        resultPackage["result"] = result
                        resolve(resultPackage);
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
                connection.query(sqlCommand, function (error, result) {
                    var resultPackage = {}
                    if (error) {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"

                        // resolve(resultPackage);
                        reject(error)
                    } else {
                        resultPackage["success"] = "success"
                        resultPackage["result"] = result[0]
                        resolve(resultPackage);
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
                connection.query(sqlCommand, function (error, result) {
                    var resultPackage = {}
                    if (error) {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"

                        // resolve(resultPackage);
                        reject(error)
                    } else {
                        resultPackage["success"] = "success"
                        resultPackage["result"] = result[0]
                        resolve(resultPackage);
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
