import {Schema, ArraySchema, type} from '@colyseus/schema'
import IPongGameState from '../../../types/IPongGameState'

export class PongGameState extends Schema implements IPongGameState
{
  @type(['number'])
  ball: ArraySchema<number>

  @type('number')
  activePlayer = 0

  @type('boolean')
  gameStarted = false

  constructor()
  {
    super()
    this.ball = new ArraySchema(0,0)
  }
}