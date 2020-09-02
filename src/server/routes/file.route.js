import express from 'express'
import groupCtrl from '../controllers/group.controller'
import friendCtrl from '../controllers/friend.controller'
import inviteCtrl from '../controllers/invite.controller'
import userDataCtrl from '../controllers/userData.controller'
import loginCtrl from '../controllers/login.controller'
import registerCtrl from '../controllers/register.controller'
import imgmodules from '../modules/image.module'
import messageCtrl from '../controllers/message.controller'
import fs from 'fs'


const multer = require('multer')

const router = express.Router()

// ===========================================            login and reagister             =============================================
router.get('/login/:userAccount/:userPassword', function (req, res) {
    loginCtrl.login(req, res)

})

router.post('/register/:userAccount/:userPassword', function (req, res) {

    registerCtrl.register(req, res)

})





// ===========================================            user data              =============================================
router.get('/userData', function (req, res) {

	userDataCtrl.getUserData(req, res)

})





// ===========================================            group               =============================================
router.post('/createGroup/:groupName', function (req, res) {

	groupCtrl.cresteGroup(req, res)

})
router.delete('/deleteGroup/:groupID', function (req, res) {

	groupCtrl.deleteGroup(req, res)

})



router.get('/group', function (req, res) {

	groupCtrl.getGroup(req, res)

})
router.post('/group/:groupID', function (req, res) {

	groupCtrl.joinGroup(req, res)

})
router.delete('/group/:groupID', function (req, res) {

	groupCtrl.leaveGroup(req, res)

})
router.get('/groupInvite', function (req, res) {

	inviteCtrl.getGroupInvite(req, res)

})



router.post('/groupInvite/:userName/:groupID', function (req, res) {

	inviteCtrl.sendGroupInvite(req, res)

})
router.delete('/groupInvite/:groupID', function (req, res) {

	inviteCtrl.rejectGroupInvite(req, res)

})




// ===========================================            friend               =============================================
router.get('/friend', function (req, res) {

	friendCtrl.getFriend(req, res)

})
router.post('/friend/:userID', function (req, res) {

	friendCtrl.addFriend(req, res)

})
router.delete('/friend/:userID', function (req, res) {

	friendCtrl.deleteFriend(req, res)

})
router.get('/friendInvite', function (req, res) {

	inviteCtrl.getFriendInvite(req, res)

})
router.post('/friendInvite/:userName', function (req, res) {

	inviteCtrl.snedFriendInvite(req, res)

})
router.delete('/friendInvite/:userID', function (req, res) {

	inviteCtrl.rejectFriendInvite(req, res)

})






// ===========================================            oldmessage               =============================================
router.get('/oldGroupMessage/:groupID/:messageID', function (req, res) {
	
	messageCtrl.getOldGroupMessage(req, res)

})
router.get('/oldFriendMessage/:friendID/:messageID', function (req, res) {

	messageCtrl.getOldFriendMessage(req, res)

})









// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 2 * 1024 * 1024,  // 限制 2 MB
//     },
//     fileFilter(req, file, callback) {  // 限制檔案格式為 image
//         if (!file.mimetype.match('image/jpeg')) {
//             callback(new Error().message = '檔案格式錯誤');
//         } else {
//             callback(null, true);
//         }
//     }
// });

// router.post('/Image', upload.single('image'), async (req, res, next) => {
//     imgmodules.uploadImage(req.file.originalname, req.file.buffer).then((getChatPreloadMessage_result) => {

//         console.log("success")

//     }).catch((err) => {

//         console.log("err")
//     })
// });

// router.get('/Image', function (req, res) {
//     imgmodules.uploadImage(1, 1).then((getChatPreloadMessage_result) => {
//         res.send(getChatPreloadMessage_result[2].img)

//     }).catch((err) => {

//         console.log(err)
//     })
//     // res.sendFile('/OnlineText/public/images/login_background.png');
// });

export default router