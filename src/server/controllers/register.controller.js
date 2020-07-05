import accountModule from '../modules/register.module'

const registerPost = (req, res) => {
    const insertValues = req.body

    accountModule.createAccount(insertValues).then((result) => {
        if (result === 'success register') {

            res.redirect('verification')

        }

    }).catch((err) => {

        res.send(err)

    })


}

export default {
    registerPost
}