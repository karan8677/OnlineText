import messageModule from '../modules/message.module'
import userDataModule from '../modules/userData.module'
import chatRoomModule from '../modules/chatRoom.module'

const getMember = (data) => {
    return new Promise((resolve, reject) => {
        
        chatRoomModule.getRoomMember(data).then((result) => {

            if (result.success === "success") {
                resolve(result)

            } else if (result.success === "fail") {

                resolve(result)

            }

        }).catch((err) => {

            resolve(result)

        })
    })

}

var saveMessage = (data) => {
    return new Promise((resolve, reject) => {
        chatRoomModule.getRoomID(data).then((result) => {

            if (result.success === "success") {
                
                data.roomID = result.result.RoomID
                messageModule.saveMessage(data).then((result) => {

                    if (result.success === "success") {
                        resolve(result)
                        
                    } else if (result.success === "fail") {

                        resolve(result)

                    }

                }).catch((err) => {

                    resolve(result)

                })


            } else if (result.success === "fail") {

                return result

            }
            
        }).catch((err) => {

            return result

        })
    })
}

const getOldMessage = (data) => {
    return new Promise((resolve, reject) => {
        messageModule.getChatPreloadMessage(data).then((result) => {

            if (result.success == "success") {


                var jsonpackage = {}
                jsonpackage["messageName"] = "getOldMessage"
                jsonpackage["data"] = result.result
                resolve(jsonpackage)

            } else {

                resolve(result)
            }

        }).catch((err) => {

            resolve(result)
        })
    })

    
}

export default {
    getMember,
    saveMessage,
    getOldMessage
}