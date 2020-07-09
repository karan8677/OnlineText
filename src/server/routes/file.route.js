import express from 'express'
import chatMessageCtrl from '../controllers/chatMessage.controller'
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

router.get('/friend', function (req, res) {
    userDataCtrl.getFriend(req, res)
})

router.get('/userName', function (req, res) {
    userDataCtrl.getName(req, res)
})

export default router