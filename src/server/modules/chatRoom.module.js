import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const creatChatRoom = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {

                var sqlCommand = "INSERT INTO ChatRoom(RoomName, Time, MemberNum, OwnID) VALUES('" +
                    insertValues.roomName + "','" +
                    "98-09-04" + "','" +
                    insertValues.memberNum + "','" +
                    insertValues.ownID + "')"

                connection.query(sqlCommand, function (err, result) {

                    var resultPackage = {}

                    if (err) {
                        console.error('SQL error:', err)
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

const getRoomID = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                var sqlCommand = "SELECT RoomID FROM ChatRoom WHERE RoomName = '" +
                    insertValues.roomName +
                    "'"

                connection.query(sqlCommand, function (error, result) {
                    var resultPackage ={}
                    if (error) {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        resolve(resultPackage);
                        // reject(error)
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

const getRoomMember = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                var sqlCommand = "SELECT member.UserID " +
                    "FROM chatroom " +

                    "INNER JOIN member " +
                    "ON chatroom.RoomID = member.RoomID " +

                    "WHERE chatroom.RoomName = '" +
                    insertValues +
                    "'"

                connection.query(sqlCommand, function (error, result) {
                    var resultPackage ={}
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
export default {
    creatChatRoom,
    getRoomID,
    getRoomMember
}
