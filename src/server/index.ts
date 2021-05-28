
import {Server} from 'colyseus'
import {monitor} from '@colyseus/monitor'
import {createServer} from 'http'
import express from 'express'
import cors from 'cors'
import PongRoom from './rooms/PongRoom'

const port = Number(process.env.port || 3000)
const app = express()

app.use(cors())
app.use(express.json())


const gameServer = new Server({
  server: createServer(app)
});

//Regisger rooms
gameServer.define('pong_room', PongRoom)

//Monitor
app.use('/colyseus', monitor())

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`)

