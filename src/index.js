import config from './config/config'
import app from './config/express'
import jwtModule from './server/modules/jwt.module'
import chatMessageCtrl from './server/controllers/chatMessage.controller'
import SocketServer from 'ws'
var clients = []
const server = require('http').createServer(app);
const wss = new SocketServer.Server({ 
    server: server
    ,
    verifyClient: function (info, cb) {
        var token = info.req.headers.cookie
        var list = {}
        
        if (!token){
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

                ws.id = jsonData.data

                break

            case "message":
                jsonData.data.roomName = 1
                jsonData.data.fromUserID = 1
                var result = chatMessageCtrl.saveMessage(jsonData.data)

                // if (result.success === "success") {

                ws.send(JSON.stringify(jsonData))
                // }

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