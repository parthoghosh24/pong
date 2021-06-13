import {Schema, ArraySchema, type} from '@colyseus/schema'
import IPongGameState from '../../../types/IPongGameState'

export class PongGameState extends Schema implements IPongGameState
{
  @type(['number'])
  ball: ArraySchema<number>

  @type('number')
  activePlayer = 0

  @type('string')
  direction = ''

  @type(['string'])
  playerSessions: ArraySchema<string>

  @type(['number'])
  playerNumbers: ArraySchema<number>

  @type('number')
  player1PaddleY = 0

  @type('number')
  player2PaddleY = 0

  @type('number')
  player1Score = 0

  @type('number')
  player2Score = 0

  @type('number')
  playerWin = 0

  @type('number')
  playersJoined = 0

  constructor()
  {
    super()
    this.ball = new ArraySchema((Math.random() * 150) + 200,(Math.random() * 150) + 200)
    this.playerSessions = new ArraySchema('', '')
    this.playerNumbers = new ArraySchema(0,0)
  }
}