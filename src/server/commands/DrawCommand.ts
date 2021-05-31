import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import IPongGameState from '../../types/IPongGameState'

type Payload = {
  client: Client
  velocityX: number
  velocityY: number 
}
export default class DrawCommand extends Command<IPongGameState, Payload>
{
  execute(data: Payload)
  {
      const { client, velocityX, velocityY } = data
      this.room.state.ball[0] = velocityX
      this.room.state.ball[1] = velocityY
  }
}
