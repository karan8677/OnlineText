import mysql from './mysql.module'
const getUserFriend = (userID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT Account.UserAccount AS friendName, FriendList.FriendID AS friendID " +
            "FROM Account " +
            "INNER JOIN FriendList " +
            "ON FriendList.UserID2 = Account.UserID " +
            "WHERE FriendList.UserID1 = " +
            userID +

            " UNION SELECT Account.UserAccount AS friendName, FriendList.FriendID AS friendID " +
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
                console.error('getUserFriend error:', err)
                reject(err)
            })

    })
}

const getFriend = (UserID1, UserID2) => {
    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT * FROM FriendList " +
            "WHERE (UserID1 = " + UserID1 + " AND UserID2 = " + UserID2 + " )" +
            " OR (UserID1 = " + UserID2 + " AND UserID2 = " + UserID1 + " )"

        mysql.mysqlCommand(sqlCommand)
            .then(result => {

                resolve(result);

            })
            .catch(err => {
                console.error('getFriend error:', err)
                reject(err)
            })
    })
}



const addFriend = (UserID1, UserID2) => {
    return new Promise((resolve, reject) =>{

        var sqlCommand = "INSERT INTO FriendList(UserID1, UserID2) VALUES(" +
        UserID1 + "," +
        UserID2 + ")"


        mysql.mysqlCommand(sqlCommand)
            .then(result => {

                resolve(result);

            })
            .catch(err => {
                console.error('addFriend error:', err)
                reject(err)
            })
    })
}

const deleteFriend = (UserID1, UserID2) => {
    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM FriendList "+
            "WHERE " +
            "(UserID1 = " + UserID1 + " AND UserID2 = " + UserID2 + ") OR " +
            "(UserID1 = " + UserID2 + " AND UserID2 = " + UserID1 + ")"



        mysql.mysqlCommand(sqlCommand)
            .then(result => {

                resolve(result);

            })
            .catch(err => {
                console.error('deleteFriend error:', err)
                reject(err)
            })
    })

}

export default{
    getUserFriend,
    getFriend,
    addFriend,
    deleteFriend
}