import messageModule from '../modules/message.module'
import chatRoomModule from '../modules/chatRoom.module'
import redis from 'redis'

const getMember = (roomName) => {
    return new Promise((resolve, reject) => {

        chatRoomModule.getRoomMember(roomName).then((getRoomMember_result) => {

            resolve(getRoomMember_result)

        }).catch((err) => {

            reject(err)

        })
    })

}

var saveMessage = (data) => {

    return new Promise((resolve, reject) => {

        chatRoomModule.getRoomID(data.roomName).then((getRoomID_result) => {

            data.roomID = getRoomID_result.RoomID
            messageModule.saveMessage(data.roomID, data.fromUserID, data.message).then((saveMessage_result) => {

                resolve(saveMessage_result)


            }).catch((err) => {

                reject(err)

            })

        }).catch((err) => {

            reject(err)

        })
    })
}

const getOldMessage = (roomName) => {
    return new Promise((resolve, reject) => {

        const client = redis.createClient();
        client.on('connect', () => {

            console.log('Redis client connected');

        });

        client.LRANGE(roomName + "_message", 0, 50, (err, result) => {

            if (result.length != 0) {
                var jsonpackage = {}
                jsonpackage["messageName"] = "getOldMessage"
                for (let x = 0; x < result.length; x++){
                    result[x] = JSON.parse(result[x])
                }
                jsonpackage["data"] = result
                resolve(jsonpackage)

            } else {
                messageModule.getChatPreloadMessage(roomName).then((getChatPreloadMessage_result) => {

                    var jsonpackage = {}
                    jsonpackage["messageName"] = "getOldMessage"
                    jsonpackage["data"] = getChatPreloadMessage_result

                    for (var x = 0; x < jsonpackage.data.length; x++) {
                        client.RPUSH(roomName + "_message", JSON.stringify(jsonpackage.data[x]));
                    }
                    resolve(jsonpackage)

                }).catch((err) => {

                    reject(err)
                })

            }
            if (err) {
                console.log(err);
                throw err;
            }

        });

    })

}

export default {
    getMember,
    saveMessage,
    getOldMessage
}