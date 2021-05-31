import { Room } from 'colyseus'
import { PongGameState } from './schema/PongGameState'
import { Message } from '../../types/Messages'
import { Dispatcher } from '@colyseus/command'
import DrawCommand from '../commands/DrawCommand'

export default class PongRoom extends Room<PongGameState>
{
  maxClients = 2

  private dispatcher = new Dispatcher(this)
  
  onCreate()
  {
    
    this.setState(new PongGameState())
    this.onMessage(Message.BallUpdated, (client, message: { velocityX: number, velocityY: number}) => {
      this.dispatcher.dispatch(new DrawCommand(), {client, velocityX: message.velocityX, velocityY: message.velocityY })
    })
    
  }

  onJoin()
  {

  }

  onLeave()
  {

  }

  onDispose()
  {

  }

}