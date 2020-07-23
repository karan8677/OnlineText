import userDataModule from '../modules/userData.module'
import jwtModule from '../modules/jwt.module'

const getRoom = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            userDataModule.getUserRoom(getUserID_result).then((getUserRoom_result) => {

                    var jsonpackage = {}
                    jsonpackage["messageName"] = "userRoom"
                    jsonpackage["data"] = getUserRoom_result
                    res.send(JSON.stringify(jsonpackage))

            }).catch((err) => {

                res.send(err)

            })

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}
const getFriend = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getName(jwtVerify_result).then((getName_result) => {

            userDataModule.getFriend(getName_result).then((getFriend_result) => {

                    var jsonpackage = {}
                    jsonpackage["messageName"] = "userFriend"
                    jsonpackage["data"] = getFriend_result
                    res.send(JSON.stringify(jsonpackage))

            }).catch((err) => {

                res.send(err)

            })

            res.send(JSON.stringify())

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}

const getID = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {


        userDataModule.getUserName(jwtVerify_result).then((getUserName_result) => {

            var jsonpackage = {}
            jsonpackage["messageName"] = "userAccount"
            jsonpackage["data"] = getUserName_result
            res.send(JSON.stringify(jsonpackage))

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}

const getName = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {


        var jsonpackage = {}
        jsonpackage["messageName"] = "userAccount"
        jsonpackage["data"] = jwtVerify_result._id
        res.send(JSON.stringify(jsonpackage))

    }).catch((err) => {

        res.send(err)

    })

}

export default {
    getRoom,
    getFriend,
    getName,
    getID
}