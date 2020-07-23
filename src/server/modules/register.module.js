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
               
                connection.query(sqlCommand, function(err, result){

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
    createAccount
}