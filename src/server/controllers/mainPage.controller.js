import jwtModule from '../modules/jwt.module'

const mainPageGet = (req, res) => {

    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            res.render('RoomInput')

        } else if (result.verify === "unverify") {

            res.redirect('login')

        } else {

            res.redirect('login')

        }

    }).catch((err) => {

        res.send(err)

    })
}

const mainPagePost = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            const RoomID = req.body.RoomID
            res.render('ChatTest', {
                RoomID: RoomID
            })

        } else if (result.verify === "unverify") {

            res.redirect('login')

        } else {

            res.redirect('login')

        }

    }).catch((error) => {

        res.send(error)

    })
}

export default {
    mainPageGet,
    mainPagePost
}