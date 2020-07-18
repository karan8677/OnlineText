import chatRoomModule from '../modules/chatRoom.module'
import jwtModule from '../modules/jwt.module'

const getRoomID = (req, res) => {
    const token = req.cookies.token;
    jwtModule.jwtVerify(token).then((result) => {

        if (result.verify === "verify") {

            chatRoomModule.getRoomID(result.payload).then((result) => {

                if (result.success === "success") {

                    res.send(JSON.stringify(result.result))

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

export default {
    getRoomID
}