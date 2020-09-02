import messageModule from '../modules/message.module'
import groupModule from '../modules/group.module'
import redis from 'redis'

const getGroupMember = async (groupID) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "getGroupMember"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const saveGroupMessageResult = await groupModule.getMember("all", groupID)
        jsonpackage["data"] = saveGroupMessageResult
        return jsonpackage

    } catch (err) {
        jsonpackage["messageName"] = "error"
        return err
    }
}

const saveGroupMessage =async (data, messagePackage) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "saveGroupMessage"
    jsonpackage["data"] = "Auth fail or database error"

    try{
        const saveGroupMessageResult = await messageModule.saveGroupMessage(data.groupID, data.fromUserID, data.message, data.time)
        const client = redis.createClient()
        client.on('connect', () => {

            console.log('Redis client connected')

        })
        client.RPUSH(data.groupID + "_groupMessage", JSON.stringify(messagePackage))
        client.expire(data.groupID + "_groupMessage", 1000)

        jsonpackage["data"] = "success"
        return jsonpackage

    }catch(err){
        jsonpackage["messageName"] = "error"
        return err
    }
}

const getOldGroupMessage = async (req ,res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "getOldGroupMessage"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const client = redis.createClient();
        client.on('connect', () => {

            console.log('Redis client connected');

        });
        client.LRANGE(req.params.groupID + "_groupMessage", 0, 50, async(err, result) => {
            var redisResult = result

            // if (redisResult.length != 0) {
            //     for (let x = 0; x < redisResult.length; x++) {
            //         redisResult[x] = JSON.parse(redisResult[x])
            //     }
            //     jsonpackage["data"] = redisResult
            //     client.expire(req.params.groupID + "_groupMessage", 1000)
            //     res.send(JSON.stringify(jsonpackage))
            // } else {
                const getGroupMessageResult = await messageModule.getGroupMessage(req.params.groupID, req.params.messageID)
                jsonpackage["data"] = getGroupMessageResult
                for (var x = 0; x < jsonpackage.data.length; x++) {
                    client.RPUSH(req.params.groupID + "_groupMessage", JSON.stringify(jsonpackage.data[x]));
                }
                client.expire(req.params.groupID + "_groupMessage", 1000)
                res.send(JSON.stringify(jsonpackage))
            // }
        })
    } catch(err){
        jsonpackage["messageName"] = "error"
        res.send(JSON.stringify(jsonpackage))
    }
    
}




const getFriend = async (friendID) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "getGroupMember"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const saveGroupMessageResult = await messageModule.getFriend(friendID)
        jsonpackage["data"] = saveGroupMessageResult
        return jsonpackage

    } catch (err) {
        jsonpackage["messageName"] = "error"
        return err
    }
}

const saveFriendMessage = async (data, messagePackage) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "saveFriendMessage"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const saveGroupMessageResult = await messageModule.saveFriendMessage(data.friendID, data.fromUserID, data.message, data.time)
        const client = redis.createClient()
        client.on('connect', () => {

            console.log('Redis client connected')

        })
        client.RPUSH(data.friendID + "_friendMessage", JSON.stringify(messagePackage))
        client.expire(data.friendID + "_friendMessage", 1000)

        jsonpackage["data"] = "success"
        return jsonpackage

    } catch (err) {
        jsonpackage["messageName"] = "error"
        return err
    }
}

const getOldFriendMessage = async (req ,res) => {
    var jsonpackage = {}
    jsonpackage["messageName"] = "getOldFriendMessage"
    jsonpackage["data"] = "Auth fail or database error"
    try {
        const client = redis.createClient();
        client.on('connect', () => {

            console.log('Redis client connected');

        });
        client.LRANGE(req.params.friendID + "_friendMessage", 0, 50, async (err, result) => {
            var redisResult = result

            // if (redisResult.length != 0) {
            //     for (let x = 0; x < redisResult.length; x++) {
            //         redisResult[x] = JSON.parse(redisResult[x])
            //     }
            //     jsonpackage["data"] = redisResult
            //     client.expire(req.params.friendID + "_friendMessage", 1000)
            //     res.send(JSON.stringify(jsonpackage))
            // } else {
                const getFriendMessageResult = await messageModule.getFriendMessage(req.params.friendID, req.params.messageID)
                jsonpackage["data"] = getFriendMessageResult
                for (var x = 0; x < jsonpackage.data.length; x++) {
                    client.RPUSH(req.params.friendID + "_friendMessage", JSON.stringify(jsonpackage.data[x]));
                }
                client.expire(req.params.friendID + "_friendMessage", 1000)
                res.send(JSON.stringify(jsonpackage))
            // }
        })
    } catch (err) {
        jsonpackage["messageName"] = "error"
        console.log(err)
        res.send(JSON.stringify(jsonpackage))
    }
}

export default {
    getGroupMember,
    saveGroupMessage,
    getOldGroupMessage,

    getFriend,
    saveFriendMessage,
    getOldFriendMessage
}