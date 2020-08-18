import mysql from './mysql.module'
const getUserFriendInvite = (UserID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT Account.UserAccount AS userName ,Account.UserID AS userID " +
            "FROM Account " +

            "INNER JOIN FriendInvite " +
            "ON FriendInvite.FromUserID = Account.UserID " +

            "WHERE FriendInvite.ToUserID =" +
            UserID

        mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('getFriendInvite error:', err)
                reject(err)
            })

    })

}

const getFriendInvite = (toUserID, fromUserID) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "SELECT * FROM FriendInvite "
            

        if (toUserID === "all"){

            sqlCommand += "WHERE FromUserID = " + fromUserID

        } else if (fromUserID === "all"){
            
            sqlCommand += "WHERE ToUserID = " + toUserID

        }else{

            sqlCommand += 
                "WHERE" +
                " ToUserID = " + toUserID +
                " AND FromUserID = " + fromUserID 

        }
        
        mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('getFriendInvite error:', err)
                reject(err)
            })

    })

}

const deleteFriendInvite = (toUserID, fromUserID)=>{
    
    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM FriendInvite " 

        if (toUserID === "all") {

            sqlCommand += "WHERE FromUserID = " + fromUserID 

        } else if (fromUserID === "all") {

            sqlCommand += "WHERE ToUserID = " + toUserID

        } else {

            sqlCommand += "WHERE ToUserID = " + toUserID + " AND FromUserID = " + fromUserID 

        }

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('deleteFriendInvite error:', err)
            reject(err)
        })

    })
    
}

const postFriendInvite = (toUserID, fromUserID)=>{
    
    return new Promise((resolve, reject) => {
 

        var sqlCommand = "INSERT INTO FriendInvite(ToUserID, FromUserID) VALUES('" +
            toUserID + "','" +
            fromUserID + "') "

        mysql.mysqlCommand(sqlCommand)
        .then(result => {

            resolve(result)

        })
        .catch(err => {
            
                console.error('postFriendInvite error:', err)
                reject(err)

        })

    })
    
}


const getUserGroupInvite = (userID) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "SELECT GroupList.GroupName AS groupName, GroupList.GroupID AS groupID " +
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
                console.error('getUserGroupInvite error:', err)
                reject(err)
            })

    })

}

const getGroupInvite = (userID, groupID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT * FROM GroupInvite "
            
        if(userID === "all"){

            sqlCommand += "WHERE GroupID = " + groupID 
            
        }else if(groupID === "all"){

            sqlCommand += "WHERE UserID = " + userID 

        }else{

            sqlCommand += 
                "WHERE" +
                " UserID = " + userID + " AND" +
                " GroupID = " + groupID
        }

        mysql.mysqlCommand(sqlCommand)
            .then(result => {

                resolve(result)
            })
            .catch(err => {
                console.error('getGroupInvite error:', err)
                reject(err)
            })

    })

}

const postGroupInvite = (userID, groupID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "INSERT INTO GroupInvite(UserID, GroupID) VALUES('" +
            userID + "','" +
            groupID + "') "

        mysql.mysqlCommand(sqlCommand)
            .then(result => {

                resolve(result)

            })
            .catch(err => {

                console.error('postGroupInvite error:', err)
                reject(err)

            })
    })

}

const deleteGroupInvite = (userID, groupID)=>{
    
    return new Promise((resolve, reject) => {
        var sqlCommand = "DELETE FROM GroupInvite WHERE "
        
        if(userID === "all"){

            sqlCommand += "GroupID = " + groupID 

        }else if(groupID === "all"){

            sqlCommand += "UserID = " + userID

        }else{
            
            sqlCommand += "UserID = " + userID + " AND GroupID = " + groupID 

        }
        
        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('deleteGroupInvite error:', err)
            reject(err)
        })

    })
    
}

export default{
    getUserFriendInvite,
    getFriendInvite,
    deleteFriendInvite,
    postFriendInvite,

    getUserGroupInvite,
    getGroupInvite,
    deleteGroupInvite,
    postGroupInvite
}