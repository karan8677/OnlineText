import express from 'express'
import registerCtrl from '../controllers/register.controller'

const router = express.Router()


// router.route('/').post(registerCtrl.registerPost)

router.post('/', (req, res) => {
    registerCtrl.registerPost(req, res)
})

router.get('/', (req, res) => {
    res.render('Register')
})

export default router