import userDataModule from '../modules/userData.module'
import jwtModule from '../modules/jwt.module'

const getRoom = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            userDataModule.getUserRoom(getUserID_result.UserID).then((getUserRoom_result) => {

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

        userDataModule.getUserID(jwtVerify_result._id).then((getUserID_result) => {

            userDataModule.getUserFriend(getUserID_result.UserID).then((getFriend_result) => {

                    var jsonpackage = {}
                    jsonpackage["messageName"] = "userFriend"
                    jsonpackage["data"] = getFriend_result
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

const getID = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {


        userDataModule.getUserID(jwtVerify_result._id).then((getUserName_result) => {

            var jsonpackage = {}
            jsonpackage["messageName"] = "userID"
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