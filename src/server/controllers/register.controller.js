import accountModule from '../modules/register.module'

const registerPost = (req, res) => {
    const insertValues = req.body

    accountModule.createAccount(insertValues).then((createAccount_result) => {

        res.redirect('verification')

    }).catch((err) => {

        res.send(err)

    })

}

export default {
    registerPost
}