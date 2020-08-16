import registerModule from '../modules/register.module'
import loginModule from '../modules/login.module'

const register = (req, res) => {
    loginModule.checkAccount(req.params.userAccount, req.params.userPassword)
        .then(result => {
            if (result === "account not found") {

                return registerModule.createAccount(req.params.userAccount, req.params.userPassword)

            } else if (result === "success" || result === "password incorrect") {

                var jsonpackage = {}
                jsonpackage["messageName"] = "register"
                jsonpackage["data"] = "account exist"
                res.send(JSON.stringify(jsonpackage))
                return Promise.reject(0)
            }

        })
        .then(result => {

            var jsonpackage = {}
            jsonpackage["messageName"] = "register"
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
    register
}