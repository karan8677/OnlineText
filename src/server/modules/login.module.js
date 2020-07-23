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

                var sqlCommand = "Select UserPassword From account Where UserAccount = '" + insertValues.user_account + "'"

                connection.query(sqlCommand, function(err, result){

                    if (err) {

                        console.error('SQL error:', err)
                        reject(err)
                        
                    } else if (result.length == 0) {

                        reject("Account no found")

                    } else if (result[0].UserPassword === insertValues.user_password) {

                        resolve(result);

                    } else {

                        console.error('SQL error:', err)
                        reject(err)
                        
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