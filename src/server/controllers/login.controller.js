import loginModule from '../modules/login.module'
import jwtModule from '../modules/jwt.module'

const login = (req, res) => {


    loginModule.checkAccount(req.params.userAccount, req.params.userPassword)
        .then(result => {
            if (result === "success") {

                return jwtModule.jwtSetCookie(req.params.userAccount, res)

            } else {

                var jsonpackage = {}
                jsonpackage["messageName"] = "login"
                jsonpackage["data"] = result
                res.send(JSON.stringify(jsonpackage))
                return Promise.reject(0)

            }
        })
        .then(result => {

            var jsonpackage = {}
            jsonpackage["messageName"] = "login"
            jsonpackage["data"] = "success"
            res.send(JSON.stringify(jsonpackage))

        })
        .catch((err) => {

            if (err !== 0) {

                var jsonpackage = {}
                jsonpackage["messageName"] = "error"
                jsonpackage["data"] = err
                res.send(JSON.stringify(jsonpackage))

            }
        })

}
export default {
    login
}