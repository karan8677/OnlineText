import loginModule from '../modules/login.module'
import jwtModule from '../modules/jwt.module'

const login = (req, res) => {

    loginModule.checkAccount(req.params.userAccount, req.params.userPassword).then((checkAccount_result) => {

        if (checkAccount_result === "success"){

            jwtModule.jwtSetCookie(req.params.userAccount, res).then((jwtSetCookie_result) => {

                if (jwtSetCookie_result === "CookieSet") {

                    var jsonpackage = {}
                    jsonpackage["result"] = "success"
                    res.send(JSON.stringify(jsonpackage))

                }
                
            }).catch((err) => {

                res.send(err)

            })

        }else{

            var jsonpackage = {}
            jsonpackage["result"] = "fail"
            jsonpackage["data"] = checkAccount_result
            res.send(JSON.stringify(jsonpackage))

        }
        

    }).catch((err) => {

        res.send(err)

    })

}
export default {
    login
}