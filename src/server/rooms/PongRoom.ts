import { Room } from 'colyseus'
import { PongGameState } from './schema/PongGameState'
import { Message } from '../../types/Messages'
import { Dispatcher } from '@colyseus/command'
import PlayerPressCommand from '../commands/PlayerPressCommand'
import BallUpdateCommand from '../commands/BallUpdateCommand'
import ScoreUpdateCommand from '../commands/ScoreUpdateCommand'

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
    this.onMessage(Message.BallUpdated, (client, message: {ballX: number, ballY: number})=>{
      this.dispatcher.dispatch(new BallUpdateCommand(), {client, ballX: message.ballX, ballY: message.ballY})
    })
    this.onMessage(Message.ScoreUpdated, (client, message: {playerScore: number, playerNumber: number})=>{
      this.dispatcher.dispatch(new ScoreUpdateCommand(), {client, playerScore: message.playerScore, playerNumber: message.playerNumber})
    })
  }

  onJoin()
  {
    this.state.playerSessions[this.clients.length-1]=this.clients[this.clients.length-1].sessionId
    this.state.playerNumbers[this.clients.length-1] = this.clients.length
    this.state.playersJoined+=1
  }

  onLeave()
  {
    this.state.playersJoined-=1
  }

  onDispose()
  {

  }

}