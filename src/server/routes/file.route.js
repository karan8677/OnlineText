import express from 'express'
import chatMessageCtrl from '../controllers/chatMessage.controller'
import inviteCtrl from '../controllers/invite.controller'
import userDataCtrl from '../controllers/userData.controller'
import loginCtrl from '../controllers/login.controller'
import registerCtrl from '../controllers/register.controller'


const router = express.Router()
// login & register
router.get('/login/:userAccount/:userPassword', function (req, res) {

    loginCtrl.login(req, res)

})

router.post('/register/:userAccount/:userPassword', function (req, res) {

    registerCtrl.register(req, res)

})

router.get('/userName', function (req, res) {
    userDataCtrl.getName(req, res)
})


// group
// router.post('/room/:roomName', function (req, res) {
//     inviteCtrl.addGroup(req, res)
// })
router.get('/room', function (req, res) {
    userDataCtrl.getRoom(req, res)
})


// friend
// router.post('/friend/:userName', function (req, res) {
//     inviteCtrl.addFriend(req, res)
// })

router.get('/friend', function (req, res) {
    userDataCtrl.getFriend(req, res)
})



// groupInvite
router.get('/groupInvite', function (req, res) {
    inviteCtrl.getGroupInvite(req, res)
})
router.post('/groupInvite/:userName/:roomName', function (req, res) {
    inviteCtrl.postFriendInvite(req, res)
})

router.delete('/groupInvite/:roomName', function (req, res) {
    inviteCtrl.deleteFriendInvite(req, res)
})


// friendInvite
router.get('/friendInvite', function (req, res) {
    inviteCtrl.getFriendInvite(req, res)
})

router.post('/friendInvite/:userName', function (req, res) {
    inviteCtrl.postFriendInvite(req, res)
})

router.delete('/friendInvite/:userName', function (req, res) {
    inviteCtrl.deleteFriendInvite(req, res)
})



// oldMessage
router.get('/oldMessage/:roomName', function (req, res) {

    chatMessageCtrl.getOldMessage(req.params.roomName).then((getOldMessage_result) => {
        
        res.send(JSON.stringify(getOldMessage_result))

    }).catch((err) => {

        console.log(err)

    })


})
export default router