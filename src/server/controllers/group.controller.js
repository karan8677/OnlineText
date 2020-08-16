import groupModule from '../modules/group.module'
import jwtModule from '../modules/jwt.module'
import userDataModule from '../modules/userData.module'


const cresteGroup = (req, res) =>{

	const token = req.cookies.token;
    var jwt_userID = 0
    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if(result.length === 1){

            jwt_userID = result[0].UserID
            return groupModule.createGroup(req.params.groupName, result[0].UserID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "createGroup"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)

        } 

    })
    .then(result => {

        return groupModule.getCertainGroupID(req.params.groupName, jwt_userID)
    
    })
    .then(result => {

        return groupModule.addMember(result[0].GroupID, jwt_userID)

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "createGroup"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}

const deleteGroup = (req, res) =>{

	const token = req.cookies.token;

    jwtModule.jwtVerify(token)
    .then(result => {

        return userDataModule.getUserID(result._id)

    })
    .then(result => {

        if(result.length === 1){
            
            return groupModule.deleteGroup(req.params.groupID)

        }else{

            var jsonpackage = {}
            jsonpackage["messageName"] = "deleteGroup"
            jsonpackage["data"] = "you are not in the database"
            res.send(JSON.stringify(jsonpackage))
            return Promise.reject(0)

        } 

    })
    .then(result => {

        var jsonpackage = {}
        jsonpackage["messageName"] = "deleteGroup"
        jsonpackage["data"] = "success"
        res.send(JSON.stringify(jsonpackage))

    })
    .catch(err => {

        res.redirect('https://127.0.0.1:3000/OnlineText/login');

    })

}


export default {
    cresteGroup,
    deleteGroup
}