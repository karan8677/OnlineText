import express from 'express'
import registerCtrl from '../controllers/register.controller'

const router = express.Router()

router.route('/').post(registerCtrl.registerPost)

router.get('/', (req, res) => {
    res.render('register')
})

export default router