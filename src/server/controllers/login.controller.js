import accountModule from '../modules/login.module'
import jwtModule from '../modules/jwt.module'

const loginPost = (req, res) => {

    const insertValues = req.body

    accountModule.checkAccount(insertValues).then((checkAccount_result) => {

        jwtModule.jwtSetCookie(insertValues.user_account, res).then((jwtSetCookie_result) => {

            if (jwtSetCookie_result === "CookieSet") {

                res.redirect('mainPage');

            } else {

                res.render("Login", {
                    success: false
                })

            }

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}
export default {
    loginPost
}