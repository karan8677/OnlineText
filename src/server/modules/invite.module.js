import mysql from './mysql.module'
import userDataModule from './userData.module'
import groupModule from './group.module'



const getFriendInvite = (toUserID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT Account.UserAccount ,Account.UserID " +
                    "FROM Account " +

                    "INNER JOIN FriendInvite " +
                    "ON FriendInvite.FromUserID = Account.UserID " +

                    "WHERE FriendInvite.ToUserID =" +
                    toUserID 

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

const deleteFriendInvite = (toUserID, fromUserID)=>{
    
    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM FriendInvite " + 
        "WHERE ToUserID = " + toUserID + " AND " +
        "FromUserID = " + fromUserID 

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

const postFriendInvite = (toUserID, fromUserID)=>{
    
    return new Promise((resolve, reject) => {
        userDataModule.getCertainFriend(toUserID, fromUserID).then(result => {

            if(result.length === 0){

                return getCertainFriendInvite(toUserID, fromUserID)

            }else{

                reject("already friend")
                return Promise.reject(0)

            }

        })
        .then(result => {

            if (result.length === 0) {

                var sqlCommand = "INSERT INTO FriendInvite(ToUserID, FromUserID) VALUES('" +
                    toUserID + "','" +
                    fromUserID + "') "

                return mysql.mysqlCommand(sqlCommand)

            }else{

                reject("already invite")
                return Promise.reject(0)
            }

        })
        .then(result => {

            resolve(result)

        })
        .catch(err => {

            if(err !== 0){
                console.error('SQL error:', err)
                reject(err)
            }

        })

    })
    
}

const getCertainFriendInvite = (toUserID, fromUserID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT FriendInviteID FROM FriendInvite " +
            "WHERE" +
            " ToUserID = " + toUserID + " AND" +
            " FromUserID = " + fromUserID + " OR(" +
            " ToUserID = " + fromUserID + " AND" +
            " FromUserID = " + toUserID + ")"

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









const getGroupInvite = (userID) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "SELECT GroupList.GroupName, GroupList.GroupID " +
            "FROM GroupList " +

            "INNER JOIN GroupInvite " +
            "ON GroupInvite.GroupID = GroupList.GroupID " +

            "WHERE GroupInvite.UserID = " +
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

const deleteGroupInvite = (userID, groupID)=>{
    
    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM GroupInvite " + 
        "WHERE UserID = " + userID + " AND " +
        "GroupID = " + groupID 

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

const postGroupInvite = (userID, groupID)=>{
    
    return new Promise((resolve, reject) => {

        groupModule.getCertainMember(userID, groupID).then(result => {

            if (result.length === 0) {

                return getCertainGroupInvite(userID, groupID)

            } else {

                reject("already member")
                return Promise.reject(0)

            }

        })
        .then(result => {

            if (result.length === 0) {

                var sqlCommand = "INSERT INTO GroupInvite(UserID, GroupID) VALUES('" +
                    userID + "','" +
                    groupID + "') "

                return mysql.mysqlCommand(sqlCommand)

            } else {

                reject("already invite")
                return Promise.reject(0)
            }

        })
        .then(result => {

            resolve(result)

        })
        .catch(err => {

            if (err !== 0) {
                console.error('SQL error:', err)
                reject(err)
            }

        })
    })
    
}

const getCertainGroupInvite = (userID, groupID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT GroupInviteID FROM GroupInvite " +
            "WHERE" +
            " UserID = " + userID + " AND" +
            " GroupID = " + groupID 

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
export default{
    getFriendInvite,
    deleteFriendInvite,
    postFriendInvite,
    getCertainFriendInvite,


    getGroupInvite,
    deleteGroupInvite,
    postGroupInvite,
    getCertainGroupInvite
}