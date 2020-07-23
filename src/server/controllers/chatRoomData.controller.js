import chatRoomModule from '../modules/chatRoom.module'
import jwtModule from '../modules/jwt.module'

const getRoomID = (req, res) => {

    const token = req.cookies.token;

    jwtModule.jwtVerify(token).then((jwtVerify_result) => {

        chatRoomModule.getRoomID(jwtVerify_result).then((getRoomID_result) => {

            res.send(JSON.stringify(getRoomID_result))

        }).catch((err) => {

            res.send(err)

        })

    }).catch((err) => {

        res.send(err)

    })

}

export default {
    getRoomID
}