
import {Server} from 'colyseus'
import {monitor} from '@colyseus/monitor'
import {createServer} from 'http'
import express from 'express'
import cors from 'cors'
import PongRoom from './rooms/PongRoom'

const port = process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(cors())
const gameServer = new Server({
  server: createServer(app)
});

gameServer.define('pong_room', PongRoom)
app.use('/colyseus', monitor());
gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`)

