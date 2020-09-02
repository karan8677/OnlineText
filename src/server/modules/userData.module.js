import mysql from './mysql.module'

const getUserID = (userAccount) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT UserID FROM Account WHERE UserAccount = '" + userAccount + "'"
        mysql.mysqlCommand(sqlCommand)
        .then(result => {

            resolve(result)
            
        })
        .catch(err => {
            console.error('getUserID error:', err)
            reject(err)
        })
    })
}

const getUserData = (userAccount) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT UserID AS userID , UserAccount AS userName FROM Account WHERE UserAccount = '" + userAccount + "'"
        
        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('getUserData error:', err)
            reject(err)
        })

    })
}



export default {
    getUserID,
    getUserData
}
