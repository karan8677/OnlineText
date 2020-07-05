import jwtModule from '../modules/jwt.module'

const mainPageGet = (req, res) => {

    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((result) => {

        if (result === "Verify") {

            res.render('RoomInput')

        } else if (result === "Unverify") {

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

        if (result === "Verify") {

            const RoomID = req.body.RoomID
            res.render('ChatTest', {
                RoomID: RoomID
            })

        } else if (result === "Unverify") {

            res.redirect('login')

        } else {

            res.redirect('login')

        }

    }).catch((err) => {

        res.send(err)

    })

}

export default {
    mainPageGet,
    mainPagePost
}