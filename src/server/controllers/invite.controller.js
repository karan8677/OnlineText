import jwtModule from '../modules/jwt.module'
import inviteModule from '../modules/invite.module'
import userDataModule from '../modules/userData.module'
import groupModule from '../modules/group.module'


const getFriendInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if(result.length === 1){
            
            return inviteModule.getFriendInvite(result[0].UserID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "getFriendInvite"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)

        } 

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "getFriendInvite"
        jsonpackage["data"] = result
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}

const deleteFriendInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if(result.length === 1){

            return inviteModule.deleteFriendInvite(result[0].UserID, req.params.userID)

        }else{

            jsonpackage["messageName"] = "deleteFriendInvite"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)

        }

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "deleteFriendInvite"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

        
    })
    .catch((err) => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}

const postFriendInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then((jwtVerify_result) => {

        return Promise.all([
                    userDataModule.getUserID(jwtVerify_result._id),
                    userDataModule.getUserID(req.params.userName)
                ])

    })
    .then(result => {

        if(result[0].length === 1 && result[1].length === 1){

            return inviteModule.postFriendInvite(result[1][0].UserID, result[0][0].UserID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "postFriendInvite"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)

        }
    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "postFriendInvite"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {

        
        if (err === "already friend" || err === "already invite"){
            var jsonpackage = {}
            jsonpackage["messageName"] = "postFriendInvite"
            jsonpackage["data"] = err
            res.send(JSON.stringify(jsonpackage))
        }else{
            res.redirect('https://127.0.0.1:3000/OnlineText/login');
        }

    })

}





const getGroupInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if(result.length === 1){

            return inviteModule.getGroupInvite(result[0].UserID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "getGroupInvite"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)

        }

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "getGroupInvite"
        jsonpackage["data"] = result
        res.send(JSON.stringify(jsonpackage))

    })
    .catch((err) => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}

const deleteGroupInvite = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then(result => {
        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if(result.length === 1){

            return inviteModule.deleteGroupInvite(result[0].UserID, req.params.groupID)

        }else{

            jsonpackage["messageName"] = "deleteGroupInvite"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)

        }   

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "deleteGroupInvite"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch((err) => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');


    })

}

const postGroupInvite = (req, res) => {
    const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then((jwtVerify_result) => {

        return Promise.all([
                    userDataModule.getUserID(jwtVerify_result._id),
                    userDataModule.getUserID(req.params.userName)
                ])

    })
    .then(result => {
        
        if(result[0].length === 1 && result[1].length === 1){
            
            return inviteModule.postGroupInvite(result[1][0].UserID, req.params.groupID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "postGroupInvite"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise,reject(0)

        }

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "postGroupInvite"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {


        if (err === "already member" || err === "already invite") {
            var jsonpackage = {}
            jsonpackage["messageName"] = "postGroupInvite"
            jsonpackage["data"] = err
            res.send(JSON.stringify(jsonpackage))
        } else {
            res.redirect('https://127.0.0.1:3000/OnlineText/login');
        }

    })

}

export default {
    getFriendInvite,
    deleteFriendInvite,
    postFriendInvite,
    getGroupInvite,
    deleteGroupInvite,
    postGroupInvite
}