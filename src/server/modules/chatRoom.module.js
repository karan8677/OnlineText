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

                connection.query('insert INTO ChatRoom SET ?', {

                    RoomName: insertValues.roomName,
                    Time: CurrentTime,
                    MemberNum: insertValues.memberNum,
                    OwnID: insertValues.ownID,

                }, (error, result) => {
                    var resultPackage = {}

                    if (error){
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        // resolve(resultPackage);
                        reject(error)
                    }else{
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
                var sqlCommand = "SELECT RoomID FROM ChatRoom WHERE RoomName =" + 
                                 insertValues.roomName

                connection.query(sqlCommand,function (error, result){

                    if (error){
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        resolve(resultPackage);
                        // reject(error)
                    }else{
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
    getRoomID
}
