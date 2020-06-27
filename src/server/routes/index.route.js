import express from 'express'
import config from '../../config/config'
import login from './login.route'
import register from './register.route'
import main_Page from './main_Page.route'
import verification from './verification.route'


const router = express.Router()

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
    res.send(`此路徑是: losdfsfdfcalhost:${config.port}/api`)
})

router.use('/login', login)
router.use('/register', register)
router.use('/main_Page', main_Page)
router.use('/verification', verification)

export default router