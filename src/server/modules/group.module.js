import mysql from './mysql.module'

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
            console.error('SQL error:', err)
            reject(err)
        })

    })
}

const deleteGroup = (groupID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "DELETE FROM Member WHERE GroupID = " + groupID

        mysql.mysqlCommand(sqlCommand)
        .then(result => {

            sqlCommand = "DELETE FROM GroupList WHERE GroupID = " + groupID
            return mysql.mysqlCommand(sqlCommand)

            
        })
        .then(result => {
            resolve(result)
        })
        .catch(err => {
            console.error('SQL error:', err)
            reject(err)
        })

    })
}

const getCertainGroupID = (groupName, UserID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT GroupID FROM GroupList WHERE" + 
        " GroupName = '" + groupName + "' AND OwnID = " + UserID + 
        " ORDER BY GroupID DESC " +
        "limit 1";

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


const deleteMember = (groupID, UserID) => {

    return new Promise((resolve, reject) => {
        var sqlCommand = "DELETE FROM Member WHERE GroupID = " +
            groupID + " AND UserID = " +
            UserID 
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
                console.error('SQL error:', err)
                reject(err)
            })

    })
}

const getCertainMember = (userID, groupID) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT MemberID FROM Member WHERE UserID = " +
            userID + " AND GroupID = " + groupID

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




const getGroupID = (groupName) => {

    return new Promise((resolve, reject) => {

        var sqlCommand = "SELECT GroupID FROM GroupList WHERE GroupName = '" +
            groupName +
            "'"

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



// const getGroupMember = (groupID) => {

//     return new Promise((resolve, reject) => {

        
//         var sqlCommand = "SELECT Member.UserID " +
//             "FROM Member " +
//             "WHERE Member.GroupID = '" +
//             groupID +
//             "'"

//         mysql.mysqlCommand(sqlCommand)
//         .then(result => {
//             resolve(result)
//         })
//         .catch(err => {
//             console.error('SQL error:', err)
//             reject(err)
//         })

//     })
// }
export default {
    createGroup,
    deleteGroup,
    getCertainGroupID,
    deleteMember,
    addMember,
    getCertainMember,
    getGroupID,
    // getGroupMember,

}
