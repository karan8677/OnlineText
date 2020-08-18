import mysql from './mysql.module'

const createAccount = (userAccount, userPassword) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "INSERT INTO Account(UserAccount, UserPassword) VALUES('" +
            userAccount + "','" +
            userPassword + "')"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            
            resolve(result);

        })
        .catch(err => {
            console.error('createAccount error:', err)
            reject(err)
        })

    })
}

export default {
    createAccount
}