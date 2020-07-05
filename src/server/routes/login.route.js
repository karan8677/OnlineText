import express from 'express'
import loginCtrl from '../controllers/login.controller'
const router = express.Router()

// router.route('/').post(loginCtrl.loginPost)

router.post('/',(req, res)=>{
    loginCtrl.loginPost(req, res)
})

router.get('/', (req, res) => {
    res.render('Login')
})


export default router