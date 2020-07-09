import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const checkAccount = (insertValues) => {
    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                connection.query('Select UserPassword From account Where UserAccount = ?', insertValues.user_account, (error, result) => {
                    var resultPackage = {}

                    if (error) {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        // resolve(resultPackage);
                        reject(error)
                    } else if (result[0].UserPassword === insertValues.user_password) {

                        resultPackage["success"] = "success"
                        resultPackage["result"] = result
                        resolve(resultPackage);

                    } else {
                        console.error('SQL error:', error)
                        resultPackage["success"] = "fail"
                        // resolve(resultPackage);
                        reject(error)
                    }

                })
                connection.release()
            }
        })

    })
}

export default {
    checkAccount
}