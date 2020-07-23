import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const saveMessage = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var dateTime = date + ' ' + time;

                var sqlCommand = "INSERT INTO Message(RoomID, FromUserID, Time, Message) VALUES('" +
                    insertValues.roomID + "','" +
                    insertValues.fromUserID + "','" +
                    dateTime + "','" +
                    insertValues.message + "')"


                connection.query(sqlCommand, function (err, result) {


                    if (err) {

                        console.error('SQL error:', err)
                        reject(err)

                    } else {

                        resolve(result);
                    }
                })
                resolve(0);
                connection.release()

            }
        })

    })
}

const getChatPreloadMessage = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                var sqlCommand = "SELECT account.UserAccount, Message.Message " +
                    "FROM chatroom " +
                    "INNER JOIN message " +
                    "ON chatroom.RoomID = message.RoomID " +

                    "INNER JOIN account " +
                    "ON account.UserID = message.FromUserID " +

                    "WHERE chatroom.RoomName = " +
                    insertValues +

                    " ORDER BY message.MessageID " +
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

    // return new Promise((resolve, reject) => {

    //     connectionPool.getConnection((connectionError, connection) => {
    //         if (connectionError) {
    //             reject(connectionError)
    //         } else {
    //             var sqlCommand = "SELECT TOP" +
    //                 insertValues.limit +
    //                 " * From Message Where RoomID = " +
    //                 insertValues.roomID +
    //                 "DESC"

    //             connection.query(sqlCommand, function (err, result){

    //                 if (err) {
    //                     console.error('SQL error:', err)
    //                     resultPackage["success"] = "fail"
    //                     resolve(resultPackage);
    //                     // reject(error)
    //                 } else {
    //                     resultPackage["success"] = "success"
    //                     resultPackage["result"] = result
    //                     resolve(resultPackage);
    //                 }
    //             })
    //             connection.release()
    //         }
    //     })

    // })
}

export default {
    saveMessage,
    getChatPreloadMessage
}