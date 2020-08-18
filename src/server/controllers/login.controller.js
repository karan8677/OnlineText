import loginModule from '../modules/login.module'
import jwtModule from '../modules/jwt.module'

const login = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "login"
    jsonpackage["data"] = "Auth fail or database error"
    try{

        const loginResult = await loginModule.checkAccount(req.params.userAccount, req.params.userPassword)
        if (loginResult === "success") {
            const setCookieResult = await jwtModule.jwtSetCookie(req.params.userAccount, res)   
        }
        jsonpackage["data"] = loginResult

    }catch(err){

        jsonpackage["messageName"] = "error"
        
    }
    res.send(JSON.stringify(jsonpackage))
}
export default {
    login
}