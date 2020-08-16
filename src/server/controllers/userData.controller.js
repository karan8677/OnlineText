import userDataModule from '../modules/userData.module'
import inviteModule from '../modules/invite.module'
import friendModule from '../modules/friend.module'
import groupModule from '../modules/group.module'
import jwtModule from '../modules/jwt.module'

const getGroup = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result =>{

        if(result.length === 1){

            return userDataModule.getUserGroup(result[0].UserID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "getGroup"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)
            
        }

    })
    .then(result =>{

        var jsonpackage = {}
        jsonpackage["messageName"] = "getGroup"
        jsonpackage["data"] = result
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}

const getFriend = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })

    .then(result => {

        if(result.length === 1){

            return userDataModule.getUserFriend(result[0].UserID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "getFriend"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)
            
        }

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "getFriend"
        jsonpackage["data"] = result
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}







const addGroup = (req, res) => {
    const token = req.cookies.token;
    var userID_JWT = 0;
    jwtModule.jwtVerify(token)
    .then((result) => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {
        if (result.length === 1) {

            userID_JWT = result[0].UserID
            
            return groupModule.getCertainMember(userID_JWT, req.params.groupID)

        } else {

            var jsonpackage = {}
            jsonpackage["messageName"] = "addGroup"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(1)

        }

    })
    .then(result => {
        if (result.length === 0) {

            return inviteModule.getCertainGroupInvite(userID_JWT, req.params.groupID)

        } else {
            var jsonpackage = {}
            jsonpackage["messageName"] = "addGroup"
            jsonpackage["data"] = "already member"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)
        }
    })
    .then(result => {

        if (result.length === 1) {

            return groupModule.addMember(req.params.groupID, userID_JWT)

        } else {
            var jsonpackage = {}
            jsonpackage["messageName"] = "addGroup"
            jsonpackage["data"] = "not invited"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)
        }

    })
    .then(result => {

        return inviteModule.deleteGroupInvite(userID_JWT, req.params.groupID)

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "addGroup"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {
        if (err !== 0) {
            res.redirect('https://127.0.0.1:3000/OnlineText/login');
        }
    })
}

const deleteGroup = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)

    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if (result.length === 1) {

            return groupModule.deleteMember(req.params.groupID, result[0].UserID)

        } else {

            var jsonpackage = {}
            jsonpackage["messageName"] = "deleteMember"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(1)

        }
    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "deleteMember"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch((err) => {
        if (err !== 0) {
            res.redirect('https://127.0.0.1:3000/OnlineText/login');
        }
    })

}






const addFriend = (req, res) => {

    const token = req.cookies.token;
    var userID_JWT = 0;
    jwtModule.jwtVerify(token)
    .then((result) => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {
        if(result.length === 1){
            userID_JWT = result[0].UserID
            return userDataModule.getCertainFriend(userID_JWT, req.params.userID)

        } else {

            var jsonpackage = {}
            jsonpackage["messageName"] = "addFriend"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(1)

        }

    })
    .then(result => {
        if(result.length === 0){

            return inviteModule.getCertainFriendInvite(userID_JWT, req.params.userID)

        }else{
            var jsonpackage = {}
            jsonpackage["messageName"] = "addFriend"
            jsonpackage["data"] = "already friend"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)
        }
    })
    .then(result => {

        if (result.length === 1) {

            return friendModule.addFriend(userID_JWT, req.params.userID)

        } else {
            var jsonpackage = {}
            jsonpackage["messageName"] = "addFriend"
            jsonpackage["data"] = "not invited"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)
        }

    })
    .then(result => {

        return inviteModule.deleteFriendInvite(userID_JWT, req.params.userID)

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "addFriend"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {
        if(err !== 0){
            res.redirect('https://127.0.0.1:3000/OnlineText/login');
        }
    })

}

const deleteFriend = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if (result.length === 1) {

            return friendModule.deleteFriend(result[0].UserID, req.params.userID)

        } else {

            var jsonpackage = {}
            jsonpackage["messageName"] = "deleteFriend"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(1)

        }
    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "deleteFriend"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch((err) => {
        if(err !== 0){
            res.redirect('https://127.0.0.1:3000/OnlineText/login');
        }
    })

}






// const getID = (req, res) => {

//     const token = req.cookies.token;

//     jwtModule.jwtVerify(token)
//     .then((result) => {

//         return userDataModule.getUserID(result._id)

//     })
//     .then(result => {

//          var jsonpackage = {}

//          if(result.length === 1){

//             jsonpackage["messageName"] = "getUserID"
//             jsonpackage["data"] = result
//             res.send(JSON.stringify(jsonpackage))

//         }else{

//             jsonpackage["messageName"] = "getUserID"
//             jsonpackage["data"] = "you are not in the database"
//             res.send(JSON.stringify(jsonpackage))
//             return Promise,reject(0)

//         }

//     })
//     .catch((err) => {

//         res.redirect('https://127.0.0.1:3000/OnlineText/login');

//     })

// }

// const getName = (req, res) => {

//     const token = req.cookies.token;

//     jwtModule.jwtVerify(token)
//     .then((result) => {


//         var jsonpackage = {}
//         jsonpackage["messageName"] = "getUserAccount"
//         jsonpackage["data"] = result._id
//         res.send(JSON.stringify(jsonpackage))

//     }).catch((err) => {

//         res.redirect('https://127.0.0.1:3000/OnlineText/login');
//     })

// }

const getUserData = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then((result) => {

        return userDataModule.getUserData(result._id)

    })
    .then(result => {

        var jsonpackage = {}
        
        if(result.length === 1){

            jsonpackage["messageName"] = "userData"
            jsonpackage["data"] = result
            res.send(JSON.stringify(jsonpackage))

        }else{

            jsonpackage["messageName"] = "userData"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)

        }
        
    })
    .catch((err) => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');
    })

}



export default {
    getGroup,
    getFriend,
    addGroup,
    deleteGroup,
    addFriend,
    deleteFriend,
    // getID,
    // getName,
    getUserData
}