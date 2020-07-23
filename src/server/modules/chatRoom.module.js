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

const getRoomID = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                var sqlCommand = "SELECT RoomID FROM ChatRoom WHERE RoomName = '" +
                    insertValues.roomName +
                    "'"

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

                connection.query(sqlCommand, function (err, result) {
                    var resultPackage ={}
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
    creatChatRoom,
    getRoomID,
    getRoomMember
}
