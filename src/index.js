import config from './config/config'
import app from './config/express'
import SocketServer from 'ws'

const server = require('http').createServer(app);
const wss = new SocketServer.Server({ server: server })

wss.on('connection', ws => {

    console.log('Client connected')
    
    ws.on('message', data => {
        ws.send(data)
    })

    ws.on('close', () => {

        console.log('Close connected')

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