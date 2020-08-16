import mysql from './mysql.module'

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
                console.error('SQL error:', err)
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
                console.error('SQL error:', err)
                reject(err)
            })
    })

}
export default{
    addFriend,
    deleteFriend
}