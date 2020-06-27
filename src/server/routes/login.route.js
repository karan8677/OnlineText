import express from 'express'
import loginCtrl from '../controllers/login.controller'

const router = express.Router()

router.route('/').post(loginCtrl.loginPost)

router.get('/',(req, res)=>{
    res.render('login')
})


export default router