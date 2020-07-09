import messageModule from '../modules/message.module'
const sendPassMessage = (req, res) => {

    // messageModule.getChatPreloadMessage(req.body).then((result) => {

    //     if (result.success === "success") {

    //         return result

    //     } else if (result.success === "fail") {

    //         return result

    //     }

    // }).catch((err) => {

    //     return result

    // })


    var josn = {
        "data": {
            "message": [
                {
                    "data": "1",
                    "RoomID": 123
                },
                {
                    "data": "2",
                    "RoomID": 123
                },
                {
                    "data": "3",
                    "RoomID": 123
                },
                {
                    "data": "4",
                    "RoomID": 123
                },
                {
                    "data": "5",
                    "RoomID": 123
                }
            ]
        },
        "messageLength": 5
    }
    res.send(JSON.stringify(josn))
}

const saveMessage = (data) => {

    messageModule.saveMessage(data).then((result) => {

        if (result.success === "success") {
            
            return result

        } else if (result.success === "fail") {

            return result

        }

    }).catch((err) => {

        return result

    })
}

export default {
    sendPassMessage,
    saveMessage
}