import redis from 'redis'
import fs from 'fs'
import https from 'https'
import config from './config/config'
import app from './config/express'
import jwtModule from './server/modules/jwt.module'
import messageCtrl from './server/controllers/message.controller'
import userDataMoudule from './server/modules/userData.module'
import SocketServer from 'ws'


var clients = []
const SERVER_CONFIG = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(SERVER_CONFIG, app)
const wss = new SocketServer.Server({
    server: server
    ,
    verifyClient: function (info, cb) {
        var token = info.req.headers.cookie
        var list = {}

        if (!token) {
            cb(false, 401, 'Unauthorized')
        }
        else {
            token.split(';').forEach(function (cookie) {
                var parts = cookie.split('=');
                list[parts.shift().trim()] = decodeURI(parts.join('='));
            })
            jwtModule.jwtVerify(list.token).then((jwtVerify_result) => {

                cb(true);

            }).catch((err) => {

                console.log(err)
                cb(false, 401, 'Unauthorized')

            })

        }

    }
})

wss.on('connection', ws => {

    clients.push(ws);

    ws.on('message', data => {

        var jsonData = JSON.parse(data)
        switch (jsonData.messageName) {


            case "userAccount":
                userDataMoudule.getUserID(jsonData.data)
                .then(result => {

                    ws.account = jsonData.data
                    ws.id = result[0].UserID
                    var messagePackage = {}
                    messagePackage["messageName"] = "userID"
                    messagePackage["data"] = result[0].UserID
                    ws.send(JSON.stringify(messagePackage))

                }).catch(err => {
                    ws.send(JSON.stringify(err))
                })

                break

            case "groupMessage":
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                var dateTime = date + ' ' + time

                jsonData.data.time = dateTime
                jsonData.data.fromUserID = ws.id
                jsonData.data.fromUserAccount = ws.account 
                var messagePackage = {}
                messagePackage["fromUserName"] = jsonData.data.fromUserAccount
                messagePackage["groupID"] = jsonData.data.groupID
                messagePackage["message"] = jsonData.data.message
                messagePackage["time"] = dateTime
                messageCtrl.saveGroupMessage(jsonData.data, messagePackage)
                .then(saveGroupMessageResult => {

                    return messageCtrl.getGroupMember(jsonData.data.groupID)

                })
                .then(getGroupMemberResult => {
                    var sendPackage = {}
                    sendPackage["messageName"] = "groupMessage"
                    sendPackage["data"] = [messagePackage]
                    for (var x = 0; x < clients.length; x++) {

                        if (getGroupMemberResult.data.some(item => item.UserID === clients[x].id)) {

                            clients[x].send(JSON.stringify(sendPackage))

                        }

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            break

            case "friendMessage":
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                var dateTime = date + ' ' + time
                jsonData.data.time = dateTime
                jsonData.data.fromUserID = ws.id
                jsonData.data.fromUserAccount = ws.account
                var messagePackage = {}
                messagePackage["fromUserName"] = jsonData.data.fromUserAccount
                messagePackage["friendID"] = jsonData.data.friendID
                messagePackage["message"] = jsonData.data.message
                messagePackage["time"] = dateTime

                messageCtrl.saveFriendMessage(jsonData.data, messagePackage)
                .then(saveMessage_result => {

                    return messageCtrl.getFriend(jsonData.data.friendID, jsonData.data.fromUserID)

                })
                .then(getFriendResult => {
                    var sendPackage={}
                    sendPackage["messageName"] = "friendMessage"
                    sendPackage["data"] = [messagePackage]
                    for (var x = 0; x < clients.length; x++) {

                        if (getFriendResult.data.some(item => getFriendResult.data[0].UserID1 === clients[x].id)  || 
                            getFriendResult.data.some(item => getFriendResult.data[0].UserID2 === clients[x].id)) {

                            clients[x].send(JSON.stringify(sendPackage))

                        }

                    }
                })
                .catch((err) => {
                    console.log(err)
                })
                break

            default:
                break

        }

    })

    ws.on('close', () => {

        console.log('Close connected')

        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }

    })

})

server.listen(config.port, () => {
    console.log(`server started on port https://127.0.
    0.1:${config.port} (${config.env})`)
})

export default
    { app, wss };