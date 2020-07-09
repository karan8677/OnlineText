import express from 'express'

const router = express.Router()

router.post('/', (req, res) => {
    res.render('Verification')
})
export default router