import messageModule from '../modules/message.module'
const messageCtrl = (req, res) => {
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

export default {
    messageCtrl
}