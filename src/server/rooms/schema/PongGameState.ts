import {Schema, type} from '@colyseus/schema'

export class PongGameState extends Schema
{
  @type("string")
  mySynchronizedProperty: string = "Hello world"
}