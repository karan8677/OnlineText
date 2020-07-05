import accountModule from '../modules/login.module'
import jwtModule from '../modules/jwt.module'

const loginPost = (req, res) => {

    const insertValues = req.body

    accountModule.checkAccount(insertValues).then((result) => {

        if (result === "success login") {

            jwtModule.jwtSetCookie(insertValues.user_account, res).then((result) => {

            }).catch((err) => {

                res.send(err)

            })

            res.redirect('mainPage');

        } else if (result === "fail login") {

            res.render("Login", {
                success: false
            })

        }

    }).catch((err) => {

        res.send(err)

    })


}

const loginGet = (req, res) => {

    const token = req.cookies;
    jwtModule.jwtVerify(token).then((result) => {

        if (result === "Verify") {

            res.redirect('mainPage')

        } else if (result === "Unverify") {

            res.redirect('Login')

        } else {

            res.redirect('Login')

        }

    }).catch((err) => {

        res.send(err)

    })

}

export default {
    loginPost,
    loginGet
}