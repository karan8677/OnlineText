import userDataModule from '../modules/userData.module'
import jwtModule from '../modules/jwt.module'

const getUserData = async (req, res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "userData"
    jsonpackage["data"] = "Auth fail or database error"
    try{

        const token = req.cookies.token
        const jwtAuthResult = await jwtModule.jwtVerify(token)
        const getUserDataResult = await userDataModule.getUserData(jwtAuthResult._id)
        if (getUserDataResult.length !== 1) {
            throw new Error()  
        }
        jsonpackage["data"] = getUserDataResult

    }catch(err){

        jsonpackage["messageName"] = "error"
        
    }
    res.send(JSON.stringify(jsonpackage))
}

export default {
    getUserData
}