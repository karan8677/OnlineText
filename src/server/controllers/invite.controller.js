import jwtModule from '../modules/jwt.module'
import inviteModule from '../modules/invite.module'
import friendModule from '../modules/friend.module'
import userDataModule from '../modules/userData.module'
import groupModule from '../modules/group.module'


const getFriendInvite = async (req, res) => {
    
    var jsonpackage ={}
    jsonpackage["messageName"] = "getFriendInvite"
    jsonpackage["data"] = "Auth fail or database error"
    try{

        const token = req.cookies.token;
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1){
            throw new Error()
        }
        const getFriendInviteResult = await inviteModule.getUserFriendInvite(getUserIDResult[0].UserID)
        jsonpackage["data"] = getFriendInviteResult

    }catch(err){
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))

}

const rejectFriendInvite = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "rejectFriendInvite"
    jsonpackage["data"] = "Auth fail or database error"
    try{
        const token = req.cookies.token;
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1){
            throw new Error()
        }
        const deleteFriendInviteResult = await inviteModule.deleteFriendInvite(getUserIDResult[0].UserID, req.params.userID)
        jsonpackage["data"] = "success"

    }catch(err){
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))
    
}

const snedFriendInvite = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "snedFriendInvite"
    jsonpackage["data"] = "Auth fail or database error"
    try{
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await Promise.all([
            userDataModule.getUserID(jwtAuthResult._id),
            userDataModule.getUserID(req.params.userName)
        ])

        if (getUserIDResult[0].length !== 1 || getUserIDResult[1].length !== 1){
            throw new Error()
        }

        const getFriendTestResult = await Promise.all([
            inviteModule.getFriendInvite(getUserIDResult[1][0].UserID
                                        , getUserIDResult[0][0].UserID),

            friendModule.getFriend(getUserIDResult[1][0].UserID
                                , getUserIDResult[0][0].UserID)
        ])

        if (getFriendTestResult[1].length !== 0){
            jsonpackage["data"] = "already friend"
        } else if (getFriendTestResult[0].length !== 0) {
            jsonpackage["data"] = "already invite"
        }else{
            const postFriendInviteResult = await inviteModule.postFriendInvite(getUserIDResult[1][0].UserID
                , getUserIDResult[0][0].UserID)
            jsonpackage["data"] = "success"
        }
    }catch(err){
        jsonpackage["messageName"] = "error"
        console.log(err)
    }
    res.send(JSON.stringify(jsonpackage))
    
}





const getGroupInvite = async (req, res) => {

    var jsonpackage = {}
    jsonpackage["messageName"] = "getGroupInvite"
    jsonpackage["data"] = "Auth fail or database error"
    try{

        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }
        const getUserGroupInviteResult = await inviteModule.getUserGroupInvite(getUserIDResult[0].UserID)
        jsonpackage["data"] = getUserGroupInviteResult
        
    }catch(err){
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))
}

const rejectGroupInvite = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "rejectGroupInvite"
    jsonpackage["data"] = "Auth fail or database error"
    try{
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1){
            throw new Error()
        }
        const deleteGroupInviteResult = await inviteModule.deleteGroupInvite(getUserIDResult[0].UserID, req.params.groupID)
        jsonpackage["data"] = "success"
    }catch(err){
        jsonpackage["messageName"] = "error"
    }

    res.send(JSON.stringify(jsonpackage))
    
}

const sendGroupInvite = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "sendGroupInvite"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await Promise.all([
            userDataModule.getUserID(jwtAuthResult._id),
            userDataModule.getUserID(req.params.userName)
        ])
        if (getUserIDResult[0].length !== 1 || getUserIDResult[1].length !== 1) {
            throw new Error()
        }
        const getGroupTestResult = await Promise.all([
            inviteModule.getGroupInvite(getUserIDResult[1][0].UserID
                , req.params.groupID),

            groupModule.getMember(getUserIDResult[1][0].UserID
                , req.params.groupID)
        ])

        if (getGroupTestResult[1].length !== 0) {
            jsonpackage["data"] = "already member"
        } else if (getGroupTestResult[0].length !== 0) {
            jsonpackage["data"] = "already invite"
        } else {
            const postGroupInviteResult = await inviteModule.postGroupInvite(getUserIDResult[1][0].UserID, req.params.groupID)
            jsonpackage["data"] = "success"
        }
    } catch (err) {
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))
}

export default {
    getFriendInvite,
    rejectFriendInvite,
    snedFriendInvite,
    getGroupInvite,
    rejectGroupInvite,
    sendGroupInvite
}