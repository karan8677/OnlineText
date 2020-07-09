import accountModule from '../modules/register.module'

const registerPost = (req, res) => {
    const insertValues = req.body

    accountModule.createAccount(insertValues).then((result) => {
        if (result.success === "success") {

            res.redirect('verification')

        } else if (result.success === "fail") {

            res.redirect('register')

        }

    }).catch((err) => {

        res.send(err)

    })


}

export default {
    registerPost
}