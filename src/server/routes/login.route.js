import express from 'express'
import loginCtrl from '../controllers/login.controller'
const router = express.Router()

router.post('/',(req, res)=>{
    loginCtrl.loginPost(req, res)
})

router.get('/', (req, res) => {
    res.render('Login')
})


export default router