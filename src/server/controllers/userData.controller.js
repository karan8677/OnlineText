import userDataModule from '../modules/userData.module'
import jwtModule from '../modules/jwt.module'

const getRoom = (req, res) => {
	const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            userDataModule.getName(result.payload).then((result) => {
                if (result.success === "success") {
                    userDataModule.getRoom(result.result).then((result) => {

                        if (result.success === "success") {
                            var jsonpackage = {}
                            jsonpackage["messageName"] = "userRoom"
                            jsonpackage["data"] = result.result
                            res.send(JSON.stringify(jsonpackage))

                        } else if (result.success === "fail") {

                            // res.redirect('OnlineText')

                        }

                    }).catch((err) => {

                        res.send(err)

                    })

                } else if (result.success === "fail") {

                    // res.redirect('OnlineText')

                }
                
            }).catch((err) => {

                res.send(err)

            })

            

        } else if (result.verify === "unverify") {

            // res.redirect('login')

        }

    }).catch((err) => {

        res.send(err)

    })

}
const getFriend = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            userDataModule.getName(result.payload).then((result) => {

                if (result.success === "success") {

                    userDataModule.getFriend(result.result).then((result) => {

                        if (result.success === "success") {

                            var jsonpackage = {}
                            jsonpackage["messageName"] = "userFriend"
                            jsonpackage["data"] = result.result
                            res.send(JSON.stringify(jsonpackage))

                        } else if (result.success === "fail") {

                            // res.redirect('OnlineText')

                        }

                    }).catch((err) => {

                        res.send(err)

                    })

                    res.send(JSON.stringify())

                } else if (result.success === "fail") {

                    // res.redirect('OnlineText')

                }

            }).catch((err) => {

                res.send(err)

            })


        } else if (result.verify === "unverify") {

            // res.redirect('login')

        }

    }).catch((err) => {

        res.send(err)

    })

}

const getID = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            userDataModule.getName(result.payload).then((result) => {
                if (result.success === "success") {

                    var jsonpackage = {}
                    jsonpackage["messageName"] = "userAccount"
                    jsonpackage["data"] = result.result
                    res.send(JSON.stringify(jsonpackage))

                } else if (result.success === "fail") {

                    // res.redirect('OnlineText')

                }

            }).catch((err) => {

                res.send(err)

            })

        } else if (result.verify === "unverify") {

            // res.redirect('login')

        }

    }).catch((err) => {

        res.send(err)

    })

}

const getName = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            var jsonpackage = {}
            jsonpackage["messageName"] = "userAccount"
            jsonpackage["data"] = result.payload._id
            res.send(JSON.stringify(jsonpackage))
        } else if (result.verify === "unverify") {

            // res.redirect('login')

        }

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