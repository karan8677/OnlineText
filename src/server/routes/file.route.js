import express from 'express'
import chatMessageCtrl from '../controllers/chatMessage.controller'
import inviteCtrl from '../controllers/invite.controller'
import userDataCtrl from '../controllers/userData.controller'

const router = express.Router()

// router.get('/chatMessage/:chatRoomName', function (req, res) {
//     chatMessageCtrl.sendPassMessage(req, res)
// })

// router.get('/chatMessage/:chatRoomName/:limit', function (req, res) {
//     chatMessageCtrl.sendPassMessage(req, res)
// })

router.get('/room', function (req, res) {

    userDataCtrl.getRoom(req, res)
})

router.get('/userName', function (req, res) {
    userDataCtrl.getName(req, res)
})


// router.put('/friend/:userName', function (req, res) {
//     userDataCtrl.getName(req, res)
// })


router.get('/friend', function (req, res) {
    userDataCtrl.getFriend(req, res)
})



router.get('/groupInvite', function (req, res) {
    inviteCtrl.getGroupInvite(req, res)
})

router.post('/groupInvite/:userName/:roomName', function (req, res) {
    inviteCtrl.postFriendInvite(req, res)
})

router.delete('/groupInvite/:roomName', function (req, res) {
    inviteCtrl.deleteFriendInvite(req, res)
})




router.get('/friendInvite', function (req, res) {
    inviteCtrl.getFriendInvite(req, res)
})

router.post('/friendInvite/:userName', function (req, res) {
    inviteCtrl.postFriendInvite(req, res)
})

router.delete('/friendInvite/:userName', function (req, res) {
    inviteCtrl.deleteFriendInvite(req, res)
})



router.get('/oldMessage/:roomName', function (req, res) {

    chatMessageCtrl.getOldMessage(req.params.roomName).then((getOldMessage_result) => {
        
        res.send(JSON.stringify(getOldMessage_result))

    }).catch((err) => {

        console.log(err)

    })


})
export default router