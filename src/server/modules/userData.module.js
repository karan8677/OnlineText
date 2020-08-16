import mysql from './mysql.module'

const getUserGroup = (userID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT GroupList.GroupID, GroupList.GroupName " +
            "FROM Member " +
            "INNER JOIN GroupList " +
            "ON GroupList.GroupID = Member.GroupID " +
            "WHERE Member.UserID = " +
            userID

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)

        })
        .catch(err => {
            console.error('SQL error:', err)
            reject(err)
        })

    })
}

const getUserFriend = (userID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT Account.UserAccount " +
            "FROM Account " +
            "INNER JOIN FriendList " +
            "ON FriendList.UserID2 = Account.UserID " +
            "WHERE FriendList.UserID1 = " +
            userID +

            " UNION SELECT Account.UserAccount " +
            "FROM Account " +
            "INNER JOIN FriendList " +
            "ON FriendList.UserID1 = Account.UserID " +
            "WHERE FriendList.UserID2 = " +
            userID 

            mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('SQL error:', err)
                reject(err)
            })

    })
}

const getUserID = (userAccount) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT UserID FROM Account WHERE UserAccount = '" + userAccount + "'"
        mysql.mysqlCommand(sqlCommand)
        .then(result => {

            resolve(result)
            
        })
        .catch(err => {
            console.error('SQL error:', err)
            reject(err)
        })
    })
}

const getUserData = (userAccount) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT UserID, UserAccount FROM Account WHERE UserAccount = '" + userAccount + "'"
        
        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('SQL error:', err)
            reject(err)
        })

    })
}



export default {
    getUserGroup,
    getUserFriend,
    getUserID,
    getUserData
}
