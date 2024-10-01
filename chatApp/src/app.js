import { WebSocketServer, WebSocket } from 'ws'
import http from 'http'
import fs from 'fs'
import path from 'path'
import express from 'express'
import routes from './routes/routes.js'
import hbs from 'hbs'
const utils = routes(), app = utils.server, PORT = utils.PORT,
    server = http.createServer(app),
    wss = new WebSocketServer({ server })
server.listen(PORT, () => console.log(`http://localhost:${PORT}`))
function socketMaintenece() {
    wss.on('connection', (ws, req) => {
        console.log('new device connected')
        ws.on('message', (data) => {
            if (Buffer.isBuffer(data)) {
                data = data.toString('utf-8')
            }
            wss.clients.forEach(client => {
                client.send(data)
            })
        })
    })
}
socketMaintenece()