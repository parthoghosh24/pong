import { Client, Room } from 'colyseus.js'
import { Schema } from '@colyseus/schema'
import 'regenerator-runtime/runtime'
import Phaser from 'phaser'
import IPongGameState from '../../types/IPongGameState'
import { Message } from '../../types/Messages'

export default class Server
{

  private client: Client
  private events: Phaser.Events.EventEmitter
  private room?: Room<IPongGameState & Schema>

  constructor()
  {
      this.client = new Client('ws://localhost:3000')
      this.events = new Phaser.Events.EventEmitter()
  }

  get sessionId()
  {
    return this.room?.sessionId
  }

  async join()
  {
    this.room = await this.client.joinOrCreate<IPongGameState & Schema>('pong_room')

    this.room.onStateChange.once(state => {
      this.events.emit('once-state-changed', state) 
    })

    this.room.state.onChange = (changes) =>{
      changes.forEach(change =>{
        const {field, value} = change
        var changeValueMap = {field: field, value: value}
        if(field === 'player1PaddleY' || field === 'player2PaddleY')
        {
          this.events.emit('paddle-update', changeValueMap)
        }
        if(field === 'ball')
        {
          console.log('hit')
          this.events.emit('ball-update', value)
        }

        if(field === 'player1Score')
        {
          changeValueMap = {field: field, value: value}
          this.events.emit('player-score-update', changeValueMap)
        }
        if(field === 'player2Score')
        {
          changeValueMap = {field: field, value: value}
          this.events.emit('player-score-update', changeValueMap)
        }
        if(field === 'playersJoined')
        {
          changeValueMap = {field: field, value: value}
          this.events.emit('player-joined', changeValueMap)
        }
      })
    }
  }

  handlePlayerPress(direction: string, activePlayer: number, paddleY: number)
  {
    if(!this.room)
    {
      return
    }

    this.room.send(Message.PlayerPressed, {direction: direction, activePlayer: activePlayer, paddleY: paddleY})
  }

  onceStateChanged(cb: ( state: IPongGameState )=> void, context?: any)
  {
    this.events.once('once-state-changed', cb, context)
  }

  onPaddleUpdate(cb: (playerMap: {field: string, value: number}) => void, context?: any)
  {
    this.events.on('paddle-update', cb, context)
  }

  handleBallUpdate(ballX: number, ballY: number)
  {
    if(!this.room)
    {
      return
    }

    this.room.send(Message.BallUpdated, {ballX: ballX, ballY: ballY})
  }

  onBallUpdate(cb: (ball:[number, number]) =>void, context?: any)
  {
    this.events.on('ball-update', cb, context)  
  }

  handlePlayerScore(playerScore: number, playerNumber: number)
  {
    if(!this.room)
    {
      return
    }
    this.room.send(Message.ScoreUpdated, {playerScore: playerScore, playerNumber: playerNumber})
  }

  onPlayerScoreUpdate(cb: (scoreMap: {field: string, value: number})=>void, context?: any)
  {
    this.events.on('player-score-update', cb, context)
  }

  onPlayersJoined(cb: (joinedMap: {field: string, value: number})=>void, context?: any)
  {
    this.events.on('player-joined', cb, context)
  }
}