import userDataModule from '../modules/userData.module'
import groupModule from '../modules/group.module'
import inviteModule from '../modules/invite.module'
import jwtModule from '../modules/jwt.module'

const getGroup = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "getGroup"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }
        const getUserGroupResult = await groupModule.getUserGroup(getUserIDResult[0].UserID)
        jsonpackage["data"] = getUserGroupResult

    } catch (err) {

        jsonpackage["messageName"] = "error"

    }
    res.send(JSON.stringify(jsonpackage))
}

const cresteGroup =async (req, res) =>{
    var jsonpackage = {}
    jsonpackage["messageName"] = "createGroup"
    jsonpackage["data"] = "Auth fail or database error"
    try{
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1){
            throw new Error()
        }
        const createGroupResult = await groupModule.createGroup(req.params.groupName, getUserIDResult[0].UserID)
        const getCertainGroupIDResult = await groupModule.getGroup(req.params.groupName, getUserIDResult[0].UserID, 1)
        if (getCertainGroupIDResult.length!==1){
            throw new Error()
        }
        const addMemberResult = await groupModule.addMember(getCertainGroupIDResult[0].GroupID, getUserIDResult[0].UserID)
        jsonpackage["data"] = "success"

    }catch(err){
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))
}

const deleteGroup =async (req, res) =>{
    var jsonpackage = {}
    jsonpackage["messageName"] = "deleteGroup"
    jsonpackage["data"] = "Auth fail or database error"
    try{
        const token = req.cookies.token;
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }

        const deleteGroupMemberInviteResult = await Promise.all([
            groupModule.deleteMember(req.params.groupID, "all"), 
            inviteModule.deleteGroupInvite("all", req.params.groupID)
        ])
        const deleteGroupResult = await groupModule.deleteGroup(req.params.groupID)
        jsonpackage["data"] = "success"
    }catch(err){
        jsonpackage["messageName"] = "error"
        console.log(err)
    }
    res.send(JSON.stringify(jsonpackage))
}

const joinGroup = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "joinGroup"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }
        const getGroupTestResult = await Promise.all([
            groupModule.getMember(getUserIDResult[0].UserID, req.params.groupID),
            inviteModule.getGroupInvite(getUserIDResult[0].UserID, req.params.groupID)
        ])

        if (getGroupTestResult[0].length !== 0) {
            jsonpackage["data"] = "already member"
        } else if (getGroupTestResult[1].length !== 1) {
            jsonpackage["data"] = "not invited"
        } else {
            const addMemberResult = await groupModule.addMember(req.params.groupID, getUserIDResult[0].UserID)
            const deleteGroupInviteResult = await inviteModule.deleteGroupInvite(getUserIDResult[0].UserID, req.params.groupID)
            jsonpackage["data"] = "success"
        }

    } catch (err) {
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))

}

const leaveGroup = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "leaveGroup"
    jsonpackage["data"] = "Auth fail or database error"
    try {

        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }
        const deleteMemberResult = await groupModule.deleteMember(req.params.groupID, getUserIDResult[0].UserID)
        jsonpackage["data"] = "success"

    } catch (err) {
        jsonpackage["messageName"] = "error"
    }
    res.send(JSON.stringify(jsonpackage))
}

export default {
    getGroup,
    cresteGroup,
    deleteGroup,
    joinGroup,
    leaveGroup
}