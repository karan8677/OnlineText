import express from 'express'
import mainPageCtrl from '../controllers/mainPage.controller'

const router = express.Router()

router.get('/', (req, res) => {

    mainPageCtrl.mainPageGet(req, res)

})

export default router