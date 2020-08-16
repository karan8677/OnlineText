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
                    ws.id = result.UserID

                }).catch(err => {
                    
                    res.send(err)
                
                })

                break

            case "groupMessage":

                jsonData.data.fromUserID = ws.id
                jsonData.data.fromUserAccount = ws.account
                messageCtrl.saveMessage(jsonData.data)
                .then(saveMessage_result => {

                    return messageCtrl.getMember(jsonData.data.groupName)

                })
                .then(result => {

                    const client = redis.createClient()
                    client.on('connect', () => {

                        console.log('Redis client connected')

                    })
                    let jsonPackage = {}
                    jsonPackage["UserAccount"] = jsonData.data.fromUserAccount
                    jsonPackage["Message"] = jsonData.data.message


                    client.RPUSH(jsonData.data.groupID + "_groupMessage", JSON.stringify(jsonPackage));
                    client.expire(jsonData.data.groupID + "_groupMessage", 1000);
                    for (var x = 0; x < clients.length; x++) {

                        if (result.some(item => item.UserID === clients[x].id)) {

                            clients[x].send(JSON.stringify(jsonData))

                        }

                    }

                })
                .catch((err) => {
                    console.log(err)
                })
                break

            // case "friendMessage":

            //     jsonData.data.fromUserID = ws.id
            //     jsonData.data.fromUserAccount = ws.account
            //     messageCtrl.saveMessage(jsonData.data)
            //     .then(saveMessage_result => {

            //         return messageCtrl.getMember(jsonData.data.groupName)

            //     })
            //     .then(result => {

            //         const client = redis.createClient()
            //         client.on('connect', () => {

            //             console.log('Redis client connected')

            //         })
            //         let jsonPackage = {}
            //         jsonPackage["UserAccount"] = jsonData.data.fromUserAccount
            //         jsonPackage["Message"] = jsonData.data.message


            //         client.RPUSH(jsonData.data.friendID + "_friendMessage", JSON.stringify(jsonPackage));
            //         client.expire(jsonData.data.friendID + "_friendMessage", 1000);
            //         for (var x = 0; x < clients.length; x++) {

            //             if (getMember_result.some(item => item.UserID === clients[x].id)) {

            //                 clients[x].send(JSON.stringify(jsonData))

            //             }
            //         }

            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })
            //     break

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