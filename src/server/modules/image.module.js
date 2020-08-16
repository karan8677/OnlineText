import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const uploadImage = (imgName, img) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                // connection.query("INSERT INTO image SET imgName = 123, img = ?;", img, function (err, result) {

                //     if (err) {

                //         console.error('SQL error:', err)
                //         reject(err)

                //     } else {

                //         resolve(result);
                //     }

                // })

                connection.query("SELECT img FROM image WHERE imgName = 123", function (err, result) {

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
    uploadImage
}