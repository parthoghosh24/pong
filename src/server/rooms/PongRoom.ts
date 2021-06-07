import { Room } from 'colyseus'
import { PongGameState } from './schema/PongGameState'
import { Message } from '../../types/Messages'
import { Dispatcher } from '@colyseus/command'
import PlayerPressCommand from '../commands/PlayerPressCommand'
import BallUpdateCommand from '../commands/BallUpdateCommand'

export default class PongRoom extends Room<PongGameState>
{
  maxClients = 2

  private dispatcher = new Dispatcher(this)
  
  onCreate()
  {

    this.setState(new PongGameState())
    this.onMessage(Message.PlayerPressed, (client, message: { direction: string, activePlayer: number, paddleY: number }) => {
      this.dispatcher.dispatch(new PlayerPressCommand(), {client, direction: message.direction, activePlayer: message.activePlayer, paddleY: message.paddleY })
    })
    this.onMessage(Message.BallUpdated, (client, message: {ballX: number, bally: number})=>{
      this.dispatcher.dispatch(new BallUpdateCommand(), {client, ballX: message.ballX, ballY: message.bally})
    })
  }

  onJoin()
  {
    this.state.playerSessions[this.clients.length-1]=this.clients[this.clients.length-1].sessionId
    this.state.playerNumbers[this.clients.length-1] = this.clients.length
  }

  onLeave()
  {

  }

  onDispose()
  {

  }

}