import mysql from './mysql.module'

const checkAccount = (userAccount, userPassword) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "Select UserPassword From Account Where UserAccount = '" + userAccount + "'"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {

            if (result.length == 0) {

                resolve("account not found")

            } else if (result[0].UserPassword === userPassword) {

                resolve("success")

            } else {

                resolve("password incorrect")

            }

        }).catch(err => {
            if (err) {

                console.error('SQL error:', err)
                reject(err)

            }
        })
    })
}

export default {
    checkAccount
}