import express from 'express'
import chatMessageCtrl from '../controllers/chatMessage.controller'

const router = express.Router()

router.get('/chatMessage/:chatRoom', function (req, res) {
    chatMessageCtrl.messageCtrl(req, res)
})

export default router