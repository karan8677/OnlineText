import registerModule from '../modules/register.module'
import loginModule from '../modules/login.module'

const register = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "register"
    jsonpackage["data"] = "Auth fail or database error"
    try{

        const checkAccountResult = await loginModule.checkAccount(req.params.userAccount, req.params.userPassword)
        if (checkAccountResult === "account not found") {

            const createAccountResult = await registerModule.createAccount(req.params.userAccount, req.params.userPassword)
            jsonpackage["data"] = checkAccountResult
            
        }else{

            jsonpackage["data"] = "account exist"
            
        }

    }catch(err){

        jsonpackage["messageName"] = "error"
        
    }
    res.send(JSON.stringify(jsonpackage))
}

export default {
    register
}