import jwtModule from '../modules/jwt.module'

const mainPageGet = (req, res) => {

    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        res.render('RoomInput')

    }).catch((err) => {

        res.send(err)

    })
}

const mainPagePost = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        const RoomID = req.body.RoomID
        res.render('GroupChat', {
            RoomID: RoomID
        })

    }).catch((error) => {

        res.send(error)

    })
}

export default {
    mainPageGet,
    mainPagePost
}