import userDataModule from '../modules/userData.module'
import inviteModule from '../modules/invite.module'
import friendModule from '../modules/friend.module'
import jwtModule from '../modules/jwt.module'
const getFriend = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "getFriend"
    jsonpackage["data"] = "Auth fail or database error"
    try {

        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {

            throw new Error()

        }
        const getUserFriendResult = await friendModule.getUserFriend(getUserIDResult[0].UserID)
        jsonpackage["data"] = getUserFriendResult
    } catch (err) {

        jsonpackage["messageName"] = "error"

    }
    res.send(JSON.stringify(jsonpackage))
}
const addFriend = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "addFriend"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }
        const getFriendTestResult = await Promise.all([
            friendModule.getFriend(getUserIDResult[0].UserID, req.params.userID),
            inviteModule.getFriendInvite(getUserIDResult[0].UserID, req.params.userID)
        ])

        if (getFriendTestResult[0].length !== 0) {
            jsonpackage["data"] = "already friend"
        } else if (getFriendTestResult[1].length !== 1) {
            jsonpackage["data"] = "not invited"
        } else {
            const addFriendResult = await friendModule.addFriend(getUserIDResult[0].UserID, req.params.userID)
            const deleteFriendInviteResult = await inviteModule.deleteFriendInvite(getUserIDResult[0].UserID, req.params.userID)
            jsonpackage["data"] = "success"
        }


    } catch (err) {
        jsonpackage["messageName"] = "error"
        console.log(err)
    }
    res.send(JSON.stringify(jsonpackage))

}
const deleteFriend = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "deleteFriend"
    jsonpackage["data"] = "Auth fail or database error"
    try {

        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserIDResult = await userDataModule.getUserID(jwtAuthResult._id)
        if (getUserIDResult.length !== 1) {
            throw new Error()
        }
        const deleteFriendResult = await friendModule.deleteFriend(req.params.userID, getUserIDResult[0].UserID)
        jsonpackage["data"] = "success"

    } catch (err) {
        jsonpackage["messageName"] = "error"
        console.log(err)
    }
    res.send(JSON.stringify(jsonpackage))
}

export default {
    getFriend,
    addFriend,
    deleteFriend
}