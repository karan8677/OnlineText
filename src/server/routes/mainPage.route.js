import express from 'express'
import mainPageCtrl from '../controllers/mainPage.controller'

const router = express.Router()

// router.route('/').post(mainPageCtrl.mainPagePost)

router.post('/', (req, res) => {

    mainPageCtrl.mainPagePost(req ,res)
})

router.get('/', (req, res) => {

    mainPageCtrl.mainPageGet(req, res)

})



export default router