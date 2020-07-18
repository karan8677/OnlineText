import config from './config/config'
import app from './config/express'
import jwtModule from './server/modules/jwt.module'
import chatMessageCtrl from './server/controllers/chatMessage.controller'
import userDataMoudule from './server/modules/userData.module'
import SocketServer from 'ws'
var clients = []
const server = require('http').createServer(app);
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
            jwtModule.jwtVerify(list.token).then((result) => {

                if (result.verify === "verify") {
                    cb(true);
                } else if (result.verify === "unverify") {
                    cb(false, 401, 'Unauthorized')
                } else {
                    cb(false, 401, 'Unauthorized')
                }

            }).catch((err) => {

                console.log(err)

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
                userDataMoudule.getUserID(jsonData.data).then((result) => {
                    if (result.success === "success") {
                        ws.account = jsonData.data
                        ws.id = result.result.UserID
                    } else if (result.success === "fail") {

                    }

                }).catch((err) => {
                    res.send(err)
                })

                
                break
            
            case "message":
                jsonData.data.fromUserID = ws.id
                jsonData.data.fromUserAccount = ws.account
                chatMessageCtrl.saveMessage(jsonData.data).then((result) => {

                    if (result.success === "success") {
                        chatMessageCtrl.getMember(jsonData.data.roomName).then((result) => {

                            
                            for (var x = 0; x < clients.length; x++) {

                                if (result.result.some(item => item.UserID === clients[x].id)) {
                                    
                                    clients[x].send(JSON.stringify(jsonData))
                                }
                            }

                        }).catch((err) => {
                            console.log(err)
                        })

                    }
                }).catch((err)=>{
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
    console.log(`server started on port http://127.0.
    0.1:${config.port} (${config.env})`)
})
// if (!module.parent) {

// }

export default
    { app, wss };