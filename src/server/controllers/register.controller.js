import registerModule from '../modules/register.module'
import loginModule from '../modules/login.module'

const register = (req, res) => {

    loginModule.checkAccount(req.params.userAccount, req.params.userPassword).then((checkAccount_result) => {
        console.log(checkAccount_result)
        if (checkAccount_result === "Account not found"){

            registerModule.createAccount(req.params.userAccount, req.params.userPassword).then((createAccount_result) => {

                var jsonpackage = {}
                jsonpackage["result"] = "success"
                res.send(JSON.stringify(jsonpackage))

            }).catch((err) => {

                res.send(err)

            })

        } else if (checkAccount_result === "success" || checkAccount_result === "Password incorrect"){

            var jsonpackage = {}
            jsonpackage["result"] = "fail"
            jsonpackage["data"] = "Account exist"
            res.send(JSON.stringify(jsonpackage))

        }
        console.log("sssss")


    }).catch((err) => {

        res.send(err)

    })

}

export default {
    register
}