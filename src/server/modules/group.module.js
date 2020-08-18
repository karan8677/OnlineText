import mysql from './mysql.module'
const getUserGroup = (userID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT GroupList.GroupID AS groupID, GroupList.GroupName AS groupName " +
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
                console.error('getUserGroup error:', err)
                reject(err)
            })

    })
}

const getGroup = (groupName, UserID, num) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "SELECT * FROM GroupList WHERE" +
            " GroupName = '" + groupName + "' AND OwnID = " + UserID +
            " ORDER BY GroupID DESC "
        if (num !== "all") {

            sqlCommand += "limit " + num;

        }


        mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('getGroup error:', err)
                reject(err)
            })

    })
}

const createGroup = (groupName, ownID) => {

    return new Promise((resolve, reject) => {

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        var sqlCommand = "INSERT INTO GroupList(GroupName, Time, MemberNum, OwnID) VALUES('" +
            groupName + "','" +
            dateTime + "','" +
            1 + "','" +
            ownID + "')"

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('createGroup error:', err)
            reject(err)
        })

    })
}

const deleteGroup = (groupID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM GroupList WHERE GroupID = " + groupID

        mysql.mysqlCommand(sqlCommand)
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('deleteGroup error:', err)
            reject(err)
        })

    })
}


const getMember = (userID, groupID) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "SELECT * FROM Member"
            " WHERE UserID = " + userID + 
            " AND GroupID = " + groupID

        if(userID === "all"){

            sqlCommand += " WHERE GroupID = " + groupID

        }else if(groupID ===　"all"){

            sqlCommand += " WHERE UserID = " + userID

        }else{

            sqlCommand +=
                " WHERE UserID = " + userID +
                " AND GroupID = " + groupID

        }
        

        mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('getMember error:', err)
                reject(err)
            })

    })
}

const addMember = (groupID, UserID) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "INSERT INTO Member(GroupID, UserID) VALUES('" +
            groupID + "','" +
            UserID + "')"
        mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('addMember error:', err)
                reject(err)
            })

    })
}

const deleteMember = (groupID, UserID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM Member "
            

        if (groupID === "all"){

            sqlCommand += "WHERE UserID = " + UserID

        } else if (UserID === "all"){

            sqlCommand += "WHERE GroupID = " + groupID

        }else{

            sqlCommand += 
                "WHERE GroupID = " + groupID +
                " AND UserID = " + UserID 
                
        }
        
        mysql.mysqlCommand(sqlCommand)
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                console.error('deleteMember error:', err)
                reject(err)
            })

    })
}


export default {
    getUserGroup,
    getGroup,
    createGroup,
    deleteGroup,
    
    getMember,
    addMember,
    deleteMember,
    
}
