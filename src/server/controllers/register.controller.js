import accountModule from '../modules/register.module'

const registerPost = (req, res) => {
    const insertValues = req.body

    accountModule.createAccount(insertValues).then((result) => {
        res.redirect('verification');
    }).catch((err) => {
        if (err.code === "ER_DUP_ENTRY") {
            console.log("fail~~~_double")
            res.render("register", {
                success: false
            })
        } else {
            res.send(err)
        }
    })


}

export default {
    registerPost
}