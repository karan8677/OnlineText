import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const getChatPreloadMessage = (insertValues) => {
    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                connection.query('Select user_password From account Where user_account = ?', insertValues.user_account, (error, result) => {
                    if (error) {

                        console.error('SQL error:', error)
                        reject(error)

                    } else if (result[0].user_password === insertValues.user_password) {
                        
                        resolve("success login");

                    } else {

                        resolve("fail login");

                    }
                })
                connection.release()
            }
        })

    })
}

export default {
    getChatPreloadMessage
}