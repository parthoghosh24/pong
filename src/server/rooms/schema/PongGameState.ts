import {Schema, type} from '@colyseus/schema'

export class PongGameState extends Schema
{
  @type("string")
  name = "Hello from Pong backend"
}