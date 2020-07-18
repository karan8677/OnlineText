import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const createAccount = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                var sqlCommand = "INSERT INTO Account(UserAccount, UserPassword) VALUES('" +
                    insertValues.user_account + "','" +
                    insertValues.user_password + "')"
               
                connection.query(sqlCommand, function(error, result){
                    var resultPackage = {}
                    if (error) {
                        console.log(sqlCommand)
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
    createAccount
}