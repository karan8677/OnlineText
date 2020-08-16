import messageModule from '../modules/message.module'
import groupModule from '../modules/group.module'
import redis from 'redis'

const getGroupMember = (groupID) => {
    return new Promise((resolve, reject) => {

        groupModule.getGroupMember(groupID)
        .then(result => {

            resolve(result)

        }).catch(err => {

            reject(err)

        })
    })

}

var saveGroupMessage = (data) => {

    return new Promise((resolve, reject) => {

        messageModule.saveGroupMessage(data.groupID, data.fromUserID, data.message)
        .then(result => {

            resolve(result)

        }).catch(err => {

            reject(err)

        })

    })
}

const getOldGroupMessage = (req ,res) => {

    const client = redis.createClient();
    client.on('connect', () => {

        console.log('Redis client connected');

    });

    client.LRANGE(req.params.groupID + "_groupMessage", 0, 50, (err, result) => {

        if (result.length != 0) {

            var jsonpackage = {}
            jsonpackage["messageName"] = "getOldGroupMessage"

            for (let x = 0; x < result.length; x++){

                result[x] = JSON.parse(result[x])

            }
            jsonpackage["data"] = result
            client.expire(req.params.groupID + "_groupMessage", 1000)
            res.send(JSON.stringify(jsonpackage))

        } else {

            messageModule.getGroupPreloadMessage(req.params.groupID)
            .then(result => {

                var jsonpackage = {}
                jsonpackage["messageName"] = "getOldGroupMessage"
                jsonpackage["data"] = result

                for (var x = 0; x < jsonpackage.data.length; x++) {
                    client.RPUSH(req.params.groupID + "_groupMessage", JSON.stringify(jsonpackage.data[x]));
                }
                client.expire(req.params.groupID + "_groupMessage", 1000)
                res.send(JSON.stringify(jsonpackage))
                    
            }).catch((err) => {

                reject(err)
            })

        }
        
        if (err) {
            console.log(err);
            throw err;
        }

    })


}

var saveFriendMessage = (data) => {

    return new Promise((resolve, reject) => {

        messageModule.saveGroupMessage(data.friendID, data.fromUserID, data.message)
        .then(result => {

            resolve(result)

        }).catch(err => {

            reject(err)

        })

    })
}

const getOldFriendMessage = (req ,res) => {

    const client = redis.createClient();
    client.on('connect', () => {

        console.log('Redis client connected');

    });

    client.LRANGE(res.params.friendID + "_friendMessage", 0, 50, (err, result) => {

        if (result.length != 0) {

            var jsonpackage = {}
            jsonpackage["messageName"] = "getOldFriendMessage"

            for (let x = 0; x < result.length; x++){

                result[x] = JSON.parse(result[x])

            }
            jsonpackage["data"] = result
            client.expire(friendID + "_friendMessage", 1000)
            res.send(JSON.stringify(jsonpackage))

        } else {

            messageModule.getGroupPreloadMessage(res.params.friendID)
            .then(result => {

                var jsonpackage = {}
                jsonpackage["messageName"] = "getOldGroupMessage"
                jsonpackage["data"] = result

                for (var x = 0; x < jsonpackage.data.length; x++) {
                    client.RPUSH(res.params.friendID + "_friendMessage", JSON.stringify(jsonpackage.data[x]));
                }
                client.expire(res.params.friendID + "_friendMessage", 1000)
                res.send(JSON.stringify(jsonpackage))
                
            }).catch((err) => {

                reject(err)
            })

        }
        
        if (err) {
            console.log(err);
            throw err;
        }

    })

}

export default {
    getGroupMember,
    saveGroupMessage,
    getOldGroupMessage,

    saveFriendMessage,
    getOldFriendMessage
}