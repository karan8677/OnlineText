import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('Register')
})

export default router