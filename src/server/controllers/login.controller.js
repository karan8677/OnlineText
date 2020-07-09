import accountModule from '../modules/login.module'
import jwtModule from '../modules/jwt.module'

const loginPost = (req, res) => {
    const insertValues = req.body

    jwtModule.jwtSetCookie(insertValues.user_account, res).then((result) => {

        if (result === "CookieSet") {

            accountModule.checkAccount(insertValues).then((result) => {

                if (result.success === "success") {


                    res.redirect('mainPage');

                } else if (result.success === "fail") {

                    res.render("Login", {
                        success: false
                    })

                }

            }).catch((err) => {

                res.send(err)

            })

        } else {

            res.render("Login", {
                success: false
            })

        }



    }).catch((err) => {

        res.send(err)

    })





}
export default {
    loginPost
}