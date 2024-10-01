import bodyParser from "body-parser"
import { WebSocketServer } from 'ws'
import http from 'http'
import fs from 'fs'
import path from 'path'
import express from 'express'
import hbs from 'hbs'
import routeObj from "./router.js"
const app = express(),
    PORT = process.env.PORT || 3000
export default function routes() {
    const dirname = path.resolve()
    const appSetting = () => {
        app.set('view engine', 'hbs')
        app.set('views', path.join(dirname, 'assets/views'))
        app.use('/api', bodyParser.urlencoded({ extended: true }))
        app.use('/api', bodyParser.json({}))
        app.use(express.static(path.join(dirname, 'public')))
    }
    appSetting()
    app.get('/', routeObj.index)
    return {
        server: app,
        PORT
    }
} 